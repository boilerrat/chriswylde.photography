export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <p className="text-sm text-slate-600 text-center">
          © {new Date().getFullYear()} Chris Wylde Photography
        </p>
      </div>
    </footer>
  );
}

