import debug from "debug";

const log = debug("bot");

export default (name: string) => log.extend(name);
