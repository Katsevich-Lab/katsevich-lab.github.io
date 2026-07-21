import { redirectResponse } from "../lib/redirectResponse";

export function GET() {
  return redirectResponse("/", "the Katsevich Lab homepage");
}
