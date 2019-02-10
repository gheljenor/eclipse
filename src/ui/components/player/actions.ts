export const ACTION_PLAYER_UPDATE = Symbol("ACTION_PLAYER_UPDATE");

export function actionPlayerUpdate(playerId, props) {
    return {type: ACTION_PLAYER_UPDATE, playerId, props};
}
