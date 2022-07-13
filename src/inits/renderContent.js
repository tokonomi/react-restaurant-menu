export default (arr) => {
    if(arr === undefined){
        return
    }else return arr.map((e, i) => {
        return(
            <option key={i}>{e}</option>
        )
    })
}