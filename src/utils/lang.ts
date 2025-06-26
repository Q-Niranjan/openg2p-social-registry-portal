export function getSupportedLocales() {
	// TODO: Find better way to do this
	const localesStr = process.env.NEXT_PUBLIC_LANGUAGES_SUPPORTED || "en fr tl";
	return localesStr.split(/\s+/);
  }
  