'use client';

// Turns ONE wheel gesture into ONE state step for the pinned showcase scenes.
//
// WHY THIS IS NEEDED. Both scenes decide their state from the pin's own progress,
// and the thresholds sit a long way apart in pixels: 0.30 of a 2.2-viewport pin is
// ~600px, six or seven wheel notches. Worse, a transition FREEZES the page while it
// plays (see scroll-lock), so every notch spun during those seconds is discarded —
// when the dashboard lands the user is still at the progress they entered on and
// has to travel the whole gap again from scratch. That is the "scroll, nothing
// happens, scroll twice more" the sequence was never meant to have, and no amount
// of retuning the thresholds fixes it: the gap the user must re-cross is whatever
// the animation's duration cost them.
//
// Pixels are the wrong unit for the question being asked. "Show me the next thing"
// is a GESTURE, not a distance — and while the row is pinned the two are freely
// interchangeable, because the page does not visibly move over the pinned range.
// So a gesture is answered by moving the scroll position itself, straight to the
// middle of the band the next state owns. The existing threshold machine is left
// completely intact and still runs the transition; the user just pays one notch
// for it instead of seven.
//
// Distance still works underneath, untouched: touch, keyboard, dragging the
// scrollbar and a long continuous scroll all cross the same thresholds they always
// did. This only shortcuts the wheel, and only while the scene is pinned.

// How much quiet ends a gesture. A mouse wheel spun steadily emits notches roughly
// 50-120ms apart and a trackpad emits a dense stream, so a shorter window would
// read one flick as several steps; a much longer one would refuse a genuine second
// notch from someone scrolling deliberately.
const GESTURE_GAP = 160;

// How much accumulated delta counts as intent. One mouse notch is 100px+, so this
// only exists to ignore the 1-3px twitches a trackpad emits under a resting finger.
const STEP_DELTA = 24;

// deltaY is not always in pixels — DOM_DELTA_LINE and DOM_DELTA_PAGE are what
// Firefox and some mice report, and taken raw they are far below STEP_DELTA.
const pxDelta = (e) =>
  e.deltaMode === 1 ? e.deltaY * 16
  : e.deltaMode === 2 ? e.deltaY * window.innerHeight
  : e.deltaY;

/**
 * Listens for wheel gestures and reports each one as a single ±1 step.
 *
 * @param isReady  true when the scene is pinned, in range, and may be stepped
 * @param isBusy   true while a transition is in flight
 * @param onStep   called with +1 (forward) or -1 (back), once per gesture
 * @returns detach function
 */
export function attachWheelSteps({ isReady, isBusy, onStep }) {
  if (typeof window === 'undefined') return () => {};

  let acc = 0;      // delta banked within the current gesture
  let last = 0;     // timestamp of the previous wheel event
  let armed = false;

  const onWheel = (e) => {
    const now = e.timeStamp || performance.now();
    const fresh = now - last > GESTURE_GAP;
    last = now;
    if (fresh) acc = 0;

    // Timing is read for EVERY wheel event, including ones outside the pinned
    // range — that is the point of doing it before the checks below. The gesture
    // that scrolls the user INTO the section is usually still running when the pin
    // engages, and it must not be spent on the first step: the icon board is the
    // arrival state and they have not looked at it yet. Only a gesture BEGUN after
    // arriving arms the stepper.
    if (!isReady()) { armed = false; return; }

    // Mid-transition the page is frozen and the wheel is going nowhere. Deltas
    // spun during it are dropped rather than banked, so holding the wheel down
    // through a four-second animation does not cash out as two more states the
    // instant the lock lifts.
    if (isBusy()) { acc = 0; armed = false; return; }

    if (fresh) armed = true;
    if (!armed) return;

    const d = pxDelta(e);
    if (!d) return;
    if (acc && (d < 0) !== (acc < 0)) acc = 0;   // turned round mid-gesture
    acc += d;
    if (Math.abs(acc) < STEP_DELTA) return;

    const dir = acc > 0 ? 1 : -1;
    acc = 0;
    // One step per gesture, and re-arming waits for the next quiet gap. This is
    // what stops a single fast flick from running the whole sequence at once.
    armed = false;
    onStep(dir);
  };

  // Passive on purpose. preventDefault would need a non-passive listener on window
  // for the WHOLE page, which forces every wheel event through the main thread and
  // costs more in scroll smoothness than it buys here. The notch the browser also
  // applies is harmless: a step hands straight over to a transition, which takes
  // the scroll lock, and the lock snaps the position back to where the step put it.
  window.addEventListener('wheel', onWheel, { passive: true });
  return () => window.removeEventListener('wheel', onWheel);
}
