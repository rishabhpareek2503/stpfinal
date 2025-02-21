export interface ExtendedTankData {
    volume: number;
    breath: {
        barScreen: number;
        oilGrease: number;
        equalization: number;
        anoxic: number;
        mbbr: number;
        tubeSettle: number;
        filterFeed: number;
        treatedWater: number;
        uf: number;
        sludge: number;
    };
    length: number;
    height: number;
}