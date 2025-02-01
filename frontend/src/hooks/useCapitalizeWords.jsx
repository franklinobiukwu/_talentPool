const useCapitalizeWords = () => {
    // Function to capitalize words
    const capitalizeWords = (str) => str.split(' ').map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ');
    return capitalizeWords
}
export default useCapitalizeWords
