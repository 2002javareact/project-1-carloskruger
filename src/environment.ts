
const devEnvironment = {
    reimbursementsBaseUrl:'http://localhost:1980'
}

// const prodEnvironment = {
//     reimbursementsBaseUrl:'http://ec2-18-189-16-67.us-east-2.compute.amazonaws.com:1980'
// }

export let environment = devEnvironment

// if(process.env.REACT_APP_ENV === 'production'){
//     environment = prodEnvironment
// }