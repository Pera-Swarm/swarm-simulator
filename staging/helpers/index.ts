export const normalizeAngle = (a: number) => {
    let b = (a + 180) % 360;
    if (b <= 0) b += 360;
    b = b - 180;
    return b;
};
