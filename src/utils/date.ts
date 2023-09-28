export const formatDate = (unformatted: number)=>{
    const crudeDate = new Date(unformatted)
    const currDate = new Date()
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

    const getY = (n: Date) =>n.getFullYear()
    const getMnt = (n:Date) =>n.getMonth();
    const getD = (n: Date) => n.getDate();
    const getH = (n: Date) => n.getHours();
    const getMin = (n: Date) =>n.getMinutes();
    const getMntName = (n: Date) =>months[getMnt(n)]
    if(getY(currDate) - getY(crudeDate) >0)return `${getMntName(crudeDate)}, ${getY(crudeDate)}`;
    if(getMnt(currDate) - getMnt(crudeDate) >0)return `${getMntName(crudeDate)} ${getD(crudeDate)}`;
    if(getD(currDate) - getD(crudeDate) >0)return `${getD(crudeDate)}-${getMntName(crudeDate)} ${to2sf(getH(crudeDate))}:${to2sf(getMin(crudeDate))}`;
    if(getH(currDate) - getH(crudeDate) > 0)return `${to2sf(getH(crudeDate))}:${to2sf(getMin(crudeDate))}`;
    if(getMin(currDate) - getMin(crudeDate) > 0)return `${getMin(currDate)-getMin(crudeDate)} minutes ago`;
    return "just now";
}

const to2sf = (s: string | number)=>{
    s= String(s)
    return s.length>=2?s:"0" +s
}