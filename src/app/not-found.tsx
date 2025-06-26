// pages/404.tsx (ONLY for static HTML export/testing with Tailwind)

export default function NotFoundPage() {
  return (
    <html lang="en">
      <head>
        <title>404 - Page Not Found</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-xl text-center">
          <div className="text-7xl font-bold text-red-500 mb-4">404</div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Page Not Found</h1>
          <p className="text-gray-600 mb-6">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md flex gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M12 6a9 9 0 100 18 9 9 0 000-18z" />
            </svg>
            <div>
              <p className="font-medium">Notice:</p>
              <p>
                If you typed the URL directly, check the spelling. If you followed a broken link, report the issue to the site admin.
              </p>
            </div>
          </div>

          <a
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l9-9 9 9v10a1 1 0 01-1 1H4a1 1 0 01-1-1V12z" />
            </svg>
            Home
          </a>

          <div className="mt-8 text-sm text-gray-500">Error Code: 404 | Page Not Found</div>
        </div>
      </body>
    </html>
  );
}
