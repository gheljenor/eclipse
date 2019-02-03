export enum ELogLevel {
    error,
    warn,
    info,
    debug,
    profile,
    verbose,
}

const logLevelTitles: { [key in ELogLevel]: string } = {
    [ELogLevel.error]: "ERROR",
    [ELogLevel.warn]: "WARN!",
    [ELogLevel.info]: "INFO!",
    [ELogLevel.debug]: "DEBUG",
    [ELogLevel.profile]: "PROFL",
    [ELogLevel.verbose]: "VERBS",
};

// @ts-ignore
const logLevel: ELogLevel = (typeof process === "undefined" ? global.logLevel : process.env.LOG_LEVEL)
    || ELogLevel.error;

export function log(level: ELogLevel, ...args) {
    if (logLevel < level) {
        return;
    }

    // tslint:disable-next-line:no-console
    console.log(logLevelTitles[level], ...args);
}

const durations = {};
const sections = {};
const durationsEnded = {};

export function logDuration(uuid: string, section?: string) {
    const ts = Date.now();

    if (!durations[uuid]) {
        durations[uuid] = ts;
        return;
    }

    const duration = ts - durations[uuid];

    if (duration > 1) {
        log(ELogLevel.verbose, uuid, duration);
    }
    delete durations[uuid];

    if (durationsEnded[uuid]) {
        log(ELogLevel.warn, "duration uuid collision", uuid);
    }
    durationsEnded[uuid] = true;

    if (!section) {
        return;
    }

    if (!sections[section]) {
        sections[section] = 0;
    }
    sections[section] += duration;
}

export function showSummary() {
    log(ELogLevel.profile, "");
    log(ELogLevel.profile, "Summary:");

    for (const key in sections) {
        log(ELogLevel.profile, `${key}:`, sections[key]);
    }

    Object.keys(sections).forEach((key) => delete sections[key]);
    Object.keys(durations).forEach((key) => delete durations[key]);
}
