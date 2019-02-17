export const ACTION_PLAYER_UPDATE = Symbol("ACTION_PLAYER_UPDATE");

type PlayerProps = {
    defender?: boolean;
    name?: string;
};

type PlayerModAction = {
    type: typeof ACTION_PLAYER_UPDATE;
    playerId: string;
    props: PlayerProps;
};

export function actionPlayerUpdate(playerId: string, props: PlayerProps): PlayerModAction {
    return {type: ACTION_PLAYER_UPDATE, playerId, props};
}
