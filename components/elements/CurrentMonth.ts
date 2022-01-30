export const CurrentMonth = () => {
    return new Date().toLocaleString('default', { month: 'long' }).substring(0, 3);
}