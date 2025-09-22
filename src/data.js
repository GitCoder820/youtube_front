export let obj = []; // initial value
let count=-1
export function setCount() {
  count--;
  console.log(count)
  console.log(obj[count].title)
}
export function resetCount(){

}
export function setObj(newObj) {
  obj.push(newObj);
  count++;
  console.log(count)
  console.log(obj[count].title)
}
export function getObj() { 
  return obj[count];
  // retrieve value
}