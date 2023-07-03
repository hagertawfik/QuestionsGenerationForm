
let Category = document.getElementById("exampleFormControlInput1");
let Domain = document.getElementById("exampleFormControlInput2");
let SubDomain = document.getElementById("exampleFormControlInput3");
let concept = document.getElementById("exampleFormControlInput4");
let complexity = document.getElementById("exampleFormControlInput5");
let lessonNumber = document.getElementById("lessonnumber");
let ourbtn = document.getElementById("ourbtn");

async function getNode(values) {
  let objectnode = {
    number : values.lessonNumber
  }
  // console.log(objectnode);
  const response = await fetch(`http://localhost:5000/lesson/getlessonbynumber`, {
    method: 'POST',
    body: JSON.stringify(objectnode),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const json =await response.json()
  return json.nodes;
}
async function displayQuestion(values) {
  let ournodes = await getNode(values)
  let newob={
    nodes :ournodes,
    domain :values.domain,
    subDomain: values.subDomain,
    concept: values.concept,
    complexity:Number(values.complexity) ,
    activityCategories: values.activityCategories,
   
  }
  // console.log(newob);
  const response = await fetch(`http://localhost:3000/question/getquestions`, {
    method: 'POST',
    body: JSON.stringify(newob),
    headers: {
      "Content-Type": "application/json",

    },
  })
  const json =await response.json()
  // console.log(json);
  let temp  = "";
 if(json.question.length !== 0){
    for (let index = 0; index < json.question.length; index++) {
      temp += `
      <p>${json.question[index].questionStyle}</p>
      `
  }
  
  document.getElementById("ourDisplayDiv").innerHTML = temp;

 }else{
   temp +=`<h3 class="text-danger mb-3">please change lesson number or complexity</h3>`;
   document.getElementById("ourDisplayDiv").innerHTML = temp;
 
 }
  
  
}

 ourbtn.addEventListener("click", async function () {
  let values = {
    domain: Domain.value,
    subDomain: SubDomain.value,
    concept: concept.value,
    activityCategories: Category.value,
    lessonNumber:Number(lessonNumber.value),
    complexity: complexity.value,
  }

  await displayQuestion(values)

})
