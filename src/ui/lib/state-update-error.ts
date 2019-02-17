export class StateUpdateError extends Error {
    public static ERROR_PLAYER_NOT_FOUND = "player id not found";
    public static ERROR_SHIP_NOT_FOUND = "ship id not found";
    public static ERROR_WEAPON_NOT_FOUND = "weapon id not found";

    constructor(message, public action) {
        super(message);
    }
}
