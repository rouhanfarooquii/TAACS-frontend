let headers = {'Content-Type': 'application/json'}
let formHeaders = {'Content-Type': 'multipart/form-data'};

export async function batchUpdateAccessControlApi(obj){
    const response = await fetch(BACKEND + 'accessControl/batchUpdate', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({accessControl: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

// export async function updateAccessControlApi(obj){
//     const response = await fetch(BACKEND + 'accessControl/update', {
//         method: 'POST',
//         observe: 'body',
//         headers: headers,
//         body: JSON.stringify({accessControl: obj})
//     })
//     const responseObj = await response.json();
//     const msg = await responseObj.msg;
//     return await msg;
// };

// export async function deleteAccessControlApi(id){
//     const response = await fetch(BACKEND + 'accessControl/delete/' + id, {
//         method: 'POST',
//         headers: headers,
//     })
//     const responseObj = await response.json();
//     const msg = await responseObj.msg;
//     return await msg;
// };

// Departments API
export async function getAllDepartmentsApi(){
    const response = await fetch(BACKEND + 'department/getall',{
        method: 'GET',
        headers: headers,
    });
    const responseObj = await response.json();
    const departments = await responseObj.departments;
    return await departments;
};

export async function addDepartmentApi(obj){
    const response = await fetch(BACKEND + 'department/add', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({department: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateDepartmentApi(obj){
    const response = await fetch(BACKEND + 'department/update', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({department: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function deleteDepartmentApi(id){
    const response = await fetch(BACKEND + 'department/delete/' + id, {
        method: 'POST',
        headers: headers,
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

// Devices API
export async function getAllDevicesApi(){
    const response = await fetch(BACKEND + 'device/getall',{
        method: 'GET',
        headers: headers,
    });
    const responseObj = await response.json();
    const devices = await responseObj.devices;
    return await devices;
};

export async function addDeviceApi(obj){
    const response = await fetch(BACKEND + 'device/add', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({device: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateDeviceApi(obj){
    const response = await fetch(BACKEND + 'device/update', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({device: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function deleteDeviceApi(id){
    const response = await fetch(BACKEND + 'device/delete/' + id, {
        method: 'POST',
        headers: headers,
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

// Emergencies API
export async function getAllEmergenciesApi(){
    const response = await fetch(BACKEND + 'emergency/getall',{
        method: 'GET',
        headers: headers,
    });
    const responseObj = await response.json();
    const emergencies = await responseObj.emergencies;
    return await emergencies;
};

export async function addEmergencyApi(obj){
    const response = await fetch(BACKEND + 'emergency/add', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({emergency: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateEmergencyApi(obj){
    const response = await fetch(BACKEND + 'emergency/update', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({emergency: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function deleteEmergencyApi(id){
    const response = await fetch(BACKEND + 'emergency/delete/' + id, {
        method: 'POST',
        headers: headers,
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

// Employees API
export async function getAllEmployeesApi(){
    const response = await fetch(BACKEND + 'employee/getall',{
        method: 'GET',
        headers: headers,
    });
    const responseObj = await response.json();
    const employees = await responseObj.employees;
    return await employees;
};

export async function addEmployeeApi(obj){
    const response = await fetch(BACKEND + 'employee/add', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({employee: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateEmployeeApi(obj){
    const response = await fetch(BACKEND + 'employee/update', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({employee: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function deleteEmployeeApi(id){
    const response = await fetch(BACKEND + 'employee/delete/' + id, {
        method: 'POST',
        headers: headers,
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

// Leaves API
export async function getAllLeavesApi(){
    const response = await fetch(BACKEND + 'leave/getall',{
        method: 'GET',
        headers: headers,
    });
    const responseObj = await response.json();
    const leaves = await responseObj.leaves;
    return await leaves;
};

export async function addLeaveApi(obj){
    const response = await fetch(BACKEND + 'leave/add', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({leave: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateLeaveApi(obj){
    const response = await fetch(BACKEND + 'leave/update', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({leave: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function deleteLeaveApi(id){
    const response = await fetch(BACKEND + 'leave/delete/' + id, {
        method: 'POST',
        headers: headers,
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

// Locations API
export async function getAllLocationsApi(){
    const response = await fetch(BACKEND + 'location/getall',{
        method: 'GET',
        headers: headers,
    });
    const responseObj = await response.json();
    const locations = await responseObj.locations;
    return await locations;
};

export async function getAllBookableLocationsApi() {
    const response = await fetch(BACKEND + 'location/getall', {
        method: 'GET',
        headers: headers,
    });
    const responseObj = await response.json();
    const locations = await responseObj.locations;
    const bookableLocations = locations.filter(location => location.bookable);
    return bookableLocations;
}

export async function addLocationApi(obj){
    const response = await fetch(BACKEND + 'location/add', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({location: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateLocationApi(obj){
    const response = await fetch(BACKEND + 'location/update', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({location: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function deleteLocationApi(id){
    const response = await fetch(BACKEND + 'location/delete/' + id, {
        method: 'POST',
        headers: headers,
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

// Parkings API
export async function getAllParkingsApi(){
    const response = await fetch(BACKEND + 'parking/getAll',{
        method: 'GET',
        headers: headers,
    });
    const responseObj = await response.json();
    return await responseObj;
};

export async function addParkingApi(obj){
    const response = await fetch(BACKEND + 'parking/add', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({parking: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateParkingApi(obj){
    const response = await fetch(BACKEND + 'parking/update', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({parking: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function deleteParkingApi(id){
    const response = await fetch(BACKEND + 'parking/delete/' + id, {
        method: 'POST',
        headers: headers,
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

// Payrolls API
export async function getAllPayrollsApi(){
    const response = await fetch(BACKEND + 'payroll/getall',{
        method: 'GET',
        headers: headers,
    });
    const responseObj = await response.json();
    const payrolls = await responseObj.payrolls;
    return await payrolls;
};

export async function addPayrollApi(obj){
    const response = await fetch(BACKEND + 'payroll/add', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({payroll: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updatePayrollApi(obj){
    const response = await fetch(BACKEND + 'payroll/update', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({payroll: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function deletePayrollApi(id){
    const response = await fetch(BACKEND + 'payroll/delete/' + id, {
        method: 'POST',
        headers: headers,
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

// RoomBookings API
export async function getAllRoomBookingsApi() {
    const response = await fetch(BACKEND + 'roomBooking/getall', {
        method: 'GET',
        headers: headers,
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const responseObj = await response.json();

    console.log('API response object:', JSON.stringify(responseObj, null, 2)); // Log the entire response object

    // Adjust the structure check according to the actual response
    if (responseObj && responseObj.roomBooking) {
        return responseObj.roomBooking;
    } else {
        throw new Error('Invalid response structure');
    }
}

export async function addRoomBookingApi(obj){
    const response = await fetch(BACKEND + 'roomBooking/add', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({roomBooking: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateRoomBookingApi(obj){
    const response = await fetch(BACKEND + 'roomBooking/update', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({roomBooking: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function deleteRoomBookingApi(id){
    const response = await fetch(BACKEND + 'roomBooking/delete/' + id, {
        method: 'POST',
        headers: headers,
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

// ShiftTimings API
export async function getAllShiftTimingsApi(){
    const response = await fetch(BACKEND + 'shiftTiming/getAll',{
        method: 'GET',
        headers: headers,
    });
    const responseObj = await response.json();
    const shiftTimings = await responseObj.shiftTimings;
    return await shiftTimings;
};

export async function addShiftTimingApi(obj){
    const response = await fetch(BACKEND + 'shiftTiming/add', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({shiftTiming: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateShiftTimingApi(obj){
    const response = await fetch(BACKEND + 'shiftTiming/update', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({shiftTiming: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function deleteShiftTimingApi(id){
    const response = await fetch(BACKEND + 'shiftTiming/delete/' + id, {
        method: 'POST',
        headers: headers,
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

// Visitors API
export async function getAllVisitorsApi(){
    const response = await fetch(BACKEND + 'visitor/getall',{
        method: 'GET',
        headers: headers,
    });
    const responseObj = await response.json();
    const visitors = await responseObj.visitors;
    return await visitors;
};

export async function addVisitorApi(obj){
    const response = await fetch(BACKEND + 'visitor/add', {
        method: 'POST',
        observe: 'body',
        headers: formHeaders,
        body: JSON.stringify({visitor: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateVisitorApi(obj){
    const response = await fetch(BACKEND + 'visitor/update', {
        method: 'POST',
        observe: 'body',
        headers: formHeaders,
        body: JSON.stringify({visitor: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function deleteVisitorApi(id){
    const response = await fetch(BACKEND + 'visitor/delete/' + id, {
        method: 'POST',
        headers: headers,
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

// Users API
export async function signUpUserApi(obj){
    const response = await fetch(BACKEND + 'user/signUp', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({user: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function logInUserApi(obj){
    const response = await fetch(BACKEND + 'user/logIn', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({user: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

// Admins API
export async function signUpAdminApi(obj){
    const response = await fetch(BACKEND + 'admin/signUp', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({admin: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function logInAdminApi(obj){
    const response = await fetch(BACKEND + 'admin/logIn', {
        method: 'POST',
        observe: 'body',
        headers: headers,
        body: JSON.stringify({admin: obj})
    })
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};