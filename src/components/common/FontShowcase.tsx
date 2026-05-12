/**
 * Font Showcase Component
 * Demonstrates Poppins and Inter fonts with different weights
 */

export default function FontShowcase() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 p-8">
      {/* Poppins Showcase */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">
          Poppins Font (Primary)
        </h2>
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
          <div className="font-poppins">
            <p className="font-light text-gray-600">
              Poppins Light (300) - The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-normal text-gray-700">
              Poppins Regular (400) - The quick brown fox jumps over the lazy
              dog
            </p>
            <p className="font-medium text-gray-800">
              Poppins Medium (500) - The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-semibold text-gray-900">
              Poppins SemiBold (600) - The quick brown fox jumps over the lazy
              dog
            </p>
            <p className="font-bold text-gray-900">
              Poppins Bold (700) - The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </div>
      </section>

      {/* Inter Showcase */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">
          Inter Font (Secondary)
        </h2>
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
          <div className="font-inter">
            <p className="font-normal text-gray-700">
              Inter Regular (400) - The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-medium text-gray-800">
              Inter Medium (500) - The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-semibold text-gray-900">
              Inter SemiBold (600) - The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </div>
      </section>

      {/* Practical Example */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Practical Example</h2>
        <div className="rounded-lg border border-gray-200 bg-white p-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Welcome to Our Platform
          </h1>
          <p className="font-inter mb-6 text-lg leading-relaxed text-gray-700">
            This is a practical example showing how Poppins works great for
            headings and UI elements, while Inter provides excellent readability
            for body text and longer paragraphs. The combination creates a
            modern, professional look.
          </p>
          <div className="flex gap-4">
            <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700">
              Get Started
            </button>
            <button className="font-inter rounded-lg border-2 border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Typography Scale */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Typography Scale</h2>
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
          <h1 className="text-5xl font-bold">Heading 1 - Poppins Bold</h1>
          <h2 className="text-4xl font-semibold">
            Heading 2 - Poppins SemiBold
          </h2>
          <h3 className="text-3xl font-semibold">
            Heading 3 - Poppins SemiBold
          </h3>
          <h4 className="text-2xl font-medium">Heading 4 - Poppins Medium</h4>
          <h5 className="text-xl font-medium">Heading 5 - Poppins Medium</h5>
          <h6 className="text-lg font-medium">Heading 6 - Poppins Medium</h6>
          <p className="font-inter text-base text-gray-700">
            Body text - Inter Regular. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
          <p className="font-inter text-sm text-gray-600">
            Small text - Inter Regular. Perfect for captions and secondary
            information.
          </p>
        </div>
      </section>
    </div>
  );
}
