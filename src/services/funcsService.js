const Util =  {
    checkEmptyObj: (obj) => {
        return !Object.keys(obj).length
    },
    formatCounterText: (num, shouldConcatBool = false) => {
        if (shouldConcatBool) {
            return num.split("").reverse().map( (x,i) => (i) % 3 === 0 && i  ? x + "," : x).reverse().join("")
        } 
        else if (num.length < 4)  {
            return num
        }
        // else if (num.length == 4) {
        //     return `${num[0]}.${num[1]}K`
        // } 
        else if (num.length < 7) {
            return `${num.substr(0,num.length - 3)}K`
        } 
        else if (num.length == 7) {
            return `${num[0]}.${num[1]}M`
        } 
        else if (num.length > 7) {
            return `${num.substr(0,num.length - 6)}M`
        } else {
            return num
        }
    }
} 


export default Util