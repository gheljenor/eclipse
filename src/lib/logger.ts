export enum ELogLevel {
    error,
    warn,
    info,
    profile,
    debug,
    verbose,
}

const logLevelTitles: { [key in ELogLevel]: string } = {
    [ELogLevel.error]: "ERROR",
    [ELogLevel.warn]: "WARN!",
    [ELogLevel.info]: "INFO!",
    [ELogLevel.profile]: "PROFL",
    [ELogLevel.debug]: "DEBUG",
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
    if (logLevel < ELogLevel.profile) {
        return;
    }

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
        sections[section] = {duration: 0, count: 0};
    }
    sections[section].duration += duration;
    sections[section].count++;
}

export function showSummary() {
    if (logLevel < ELogLevel.profile) {
        return;
    }

    log(ELogLevel.profile, "");
    log(ELogLevel.profile, "Summary:");

    Object.keys(sections).sort().forEach((key) => {
        sections[key].avg = sections[key].duration / sections[key].count;
        log(ELogLevel.profile, `${key}:`, sections[key]);
    });

    Object.keys(sections).forEach((key) => delete sections[key]);
    Object.keys(durations).forEach((key) => delete durations[key]);
    Object.keys(durationsEnded).forEach((key) => delete durationsEnded[key]);
}
