export const randomNumber = (min, max) => {
    return (Math.random() * (max - min + 1) + min).toFixed(1)
}