export interface TankData {
    type: string;
    BarScreen: number;
    OilGreaseTank: number;
    EqualizationTank: number;
    AnoxicTank: number;
    MBBRTank: number;
    TubeSettle: number;
    FilterFeedTank: number;
    TreatedWaterTank: number;
    UFWaterTank: number;
    SludgeHoldingTank: number;
    volume: number;
    length: number;  // Will be constant 3
    height: number;  // Will be constant 3
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
}