let headers = {'Content-Type': 'application/json'}
import { navigate } from 'svelte-routing';

export async function batchUpdateAccessControlApi(obj){
    const response = await fetch(BACKEND + 'accessControl/batchUpdate', {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({accessControl: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function getAllAttendances(start, end){
    const response = await fetch(BACKEND + 'attendance/getAll/' + start + "/" + end ,{
        method: 'GET',
        headers: getAuthHeader(),
    });
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const attendances = await responseObj.attendances;
    return await attendances;
};

export async function getOneAttendance(start, end){
    const response = await fetch(BACKEND + 'attendance/getOne/' + start + "/" + end ,{
        method: 'GET',
        headers: getAuthHeader(),
    });
    if(response.status == 401){
        navigate('/auth/login');
    }
    const responseObj = await response.json();
    const attendances = await responseObj.attendances;
    return await attendances;
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
        headers: getAuthHeader(),
    });
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const departments = await responseObj.departments;
    return await departments;
};

export async function addDepartmentApi(obj){
    const response = await fetch(BACKEND + 'department/add', {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({department: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateDepartmentApi(obj){
    const response = await fetch(BACKEND + 'department/update', {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({department: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function deleteDepartmentApi(id){
    const response = await fetch(BACKEND + 'department/delete/' + id, {
        method: 'POST',
        headers: getAuthHeader(),
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

// Devices API
export async function getAllDevicesApi(){
    const response = await fetch(BACKEND + 'device/getall',{
        method: 'GET',
        headers: getAuthHeader(),
    });
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const devices = await responseObj.devices;
    return await devices;
};

export async function addDeviceApi(obj){
    const response = await fetch(BACKEND + 'device/add', {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({device: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateDeviceApi(obj){
    const response = await fetch(BACKEND + 'device/update', {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({device: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function deleteDeviceApi(id){
    const response = await fetch(BACKEND + 'device/delete/' + id, {
        method: 'POST',
        headers: getAuthHeader(),
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

// Emergencies API
export async function getAllEmergenciesApi(){
    const response = await fetch(BACKEND + 'emergency/getall',{
        method: 'GET',
        headers: getAuthHeader(),
    });
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const emergencies = await responseObj.emergencies;
    return await emergencies;
};

export async function addEmergencyApi(obj){
    const response = await fetch(BACKEND + 'emergency/add', {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({emergency: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateEmergencyApi(obj){
    const response = await fetch(BACKEND + 'emergency/update', {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({emergency: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function activateEmergencyApi(id){
    const response = await fetch(BACKEND + 'emergency/activate/' + id, {
        method: 'POST',
        headers: getAuthHeader(),
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function deactivateEmergencyApi(id){
    const response = await fetch(BACKEND + 'emergency/deactivate/' + id, {
        method: 'POST',
        headers: getAuthHeader(),
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function deleteEmergencyApi(id) {
    try {
        const response = await fetch(BACKEND + 'emergency/delete/' + id, {
            method: 'DELETE',
            headers: getAuthHeader(),
        });
        if(response.status == 401){
            navigate('/auth/adminlogin');
        }
        const responseText = await response.text();
        console.log('Raw response text:', responseText);

        const responseObj = JSON.parse(responseText);
        return responseObj.msg;
    } catch (error) {
        console.error('Error in deleteEmergencyApi:', error);
        throw error;
    }
}

// Employees API
export async function getAllEmployeesApi(){
    const response = await fetch(BACKEND + 'employee/getall',{
        method: 'GET',
        headers: getAuthHeader(),
    });
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const employees = await responseObj.employees;
    return await employees;
};

export async function getOneEmployeeApi(){
    const response = await fetch(BACKEND + 'employee/getOne',{
        method: 'GET',
        headers: getAuthHeader(),
    });
    if(response.status == 401){
        navigate('/auth/login');
    }
    const responseObj = await response.json();
    const employee = await responseObj.employee;
    return await employee;
};

// export async function loginEmployeeApi(obj){
//     const response = await fetch(BACKEND + 'employee/logIn',{
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify({ employee: obj })
//     });
//     console.log('API Response Status:', response.status);
//     const responseObj = await response.json();
//     console.log('API Response JSON:', responseObj);
//     return responseObj;
// }

export async function loginEmployeeApi(obj){
    const response = await fetch(BACKEND + 'employee/logIn',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('token')}` // Include token in header
        },
        body: JSON.stringify({ employee: obj })
    });
    console.log('API Response Status:', response.status);
    console.log("Cookie: ", getCookie('adminToken'));
    const responseObj = await response.json();
    console.log('API Response JSON:', responseObj);
    return responseObj;
}

export async function addEmployeeApi(obj){
    const response = await fetch(BACKEND + 'employee/add', {
        method: 'POST',
        body: obj,
        headers: getAuthHeader(),
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateEmployeeApi(obj){
    const response = await fetch(BACKEND + 'employee/update', {
        method: 'POST',
        body: obj,
        headers: getAuthHeader(),
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateEmployeePasswordApi(obj){
    const response = await fetch(BACKEND + 'employee/updatePassword', {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({employee: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateEmployeeJSONApi(obj){
    const response = await fetch(BACKEND + 'employee/updateJSON', {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({employee: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function deleteEmployeeApi(id){
    const response = await fetch(BACKEND + 'employee/delete/' + id, {
        method: 'POST',
        headers: getAuthHeader(),
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

// Leaves API
//Authenticated or no ?
export async function getAllLeavesApi(){
    const response = await fetch(BACKEND + 'leave/getAll',{
        method: 'GET',
        headers: getAuthHeader(),
    });
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const leaves = await responseObj.leaves;
    return await leaves;
};

export async function addLeaveApi(obj, isAdmin){
    const response = await fetch(BACKEND + 'leave/add', {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({leave: obj})
    })
    if(response.status == 401){
        if(isAdmin){
            navigate('/auth/adminlogin');
        }
        else{
            navigate('/auth/login');
        }
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateLeaveApprovedApi(id, obj){
    const response = await fetch(`${BACKEND}leave/approved/${id}`, {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({leave: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateLeaveRejectedApi(id, obj){
    const response = await fetch(`${BACKEND}leave/rejected/${id}`, {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({leave: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

// Locations API
export async function getAllLocationsApi(isAdmin){
    const response = await fetch(BACKEND + 'location/getall',{
        method: 'GET',
        headers: getAuthHeader(),
    });
    if(response.status == 401){
        if(isAdmin){
            navigate('/auth/adminlogin');
        }
        else{
            navigate('/auth/login');
        }
    }
    const responseObj = await response.json();
    const locations = await responseObj.locations;
    return await locations;
};

export async function getAllBookableLocationsApi() {
    const response = await fetch(BACKEND + 'location/getall', {
        method: 'GET',
        headers: getAuthHeader(),
    });
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const locations = await responseObj.locations;
    const bookableLocations = locations.filter(location => location.bookable);
    return bookableLocations;
}

export async function addLocationApi(obj){
    const response = await fetch(BACKEND + 'location/add', {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({location: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateLocationApi(obj){
    const response = await fetch(BACKEND + 'location/update', {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({location: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function deleteLocationApi(id){
    const response = await fetch(BACKEND + 'location/delete/' + id, {
        method: 'POST',
        headers: getAuthHeader(),
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

// Parkings API
export async function getAllParkingsApi(){
    const response = await fetch(BACKEND + 'parking/getAll',{
        method: 'GET',
        headers: getAuthHeader(),
    });
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    return await responseObj;
};

export async function addParkingApi(obj){
    const response = await fetch(BACKEND + 'parking/add', {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({parking: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateParkingApi(obj){
    const response = await fetch(BACKEND + 'parking/update', {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({parking: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function deleteParkingApi(id){
    const response = await fetch(BACKEND + 'parking/delete/' + id, {
        method: 'POST',
        headers: getAuthHeader(),
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

// Payrolls API
export async function getAllPayrollsApi(){
    const response = await fetch(BACKEND + 'payroll/getall',{
        method: 'GET',
        headers: getAuthHeader(),
    });
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const payrolls = await responseObj.payrolls;
    return await payrolls;
};

export async function addPayrollApi(obj){
    const response = await fetch(BACKEND + 'payroll/add', {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({payroll: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updatePayrollApi(obj){
    const response = await fetch(BACKEND + 'payroll/update', {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({payroll: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function batchUpdatePayrollApi(obj){
    const response = await fetch(BACKEND + 'payroll/batchUpdate', {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({payroll: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function deletePayrollApi(id){
    const response = await fetch(BACKEND + 'payroll/delete/' + id, {
        method: 'POST',
        headers: getAuthHeader(),
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

// RoomBookings API
// export async function getAllRoomBookingsApi() {
//     const response = await fetch(BACKEND + 'roomBooking/getall', {
//         method: 'GET',
//         headers: headers,
//     });

//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     const responseObj = await response.json();

//     // console.log('API response object:', JSON.stringify(responseObj, null, 2)); // Log the entire response object

//     // Adjust the structure check according to the actual response
//     if (responseObj && responseObj.roomBooking) {
//         return responseObj.roomBooking;
//     } else {
//         throw new Error('Invalid response structure');
//     }
// }

export async function getAllRoomBookingsApi(){
    const response = await fetch(BACKEND + 'roomBooking/getall',{
        method: 'GET',
        headers: getAuthHeader(),
    });
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const roomBookings = await responseObj.roomBookings;
    return await roomBookings;
};

export async function addRoomBookingApi(obj){
    const response = await fetch(BACKEND + 'roomBooking/add', {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({roomBooking: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateRoomBookingApi(obj){
    const response = await fetch(BACKEND + 'roomBooking/update', {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({roomBooking: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function deleteRoomBookingApi(id){
    const response = await fetch(BACKEND + 'roomBooking/delete/' + id, {
        method: 'POST',
        headers: getAuthHeader(),
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

// ShiftTimings API
export async function getAllShiftTimingsApi(){
    const response = await fetch(BACKEND + 'shiftTiming/getAll',{
        method: 'GET',
        headers: getAuthHeader(),
    });
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const shiftTimings = await responseObj.shiftTimings;
    return await shiftTimings;
};

export async function addShiftTimingApi(obj){
    const response = await fetch(BACKEND + 'shiftTiming/add', {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({shiftTiming: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateShiftTimingApi(obj){
    const response = await fetch(BACKEND + 'shiftTiming/update', {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({shiftTiming: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function batchDeleteShiftTimingApi(obj){
    const response = await fetch(BACKEND + 'shiftTiming/update', {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({shiftTiming: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function deleteShiftTimingApi(id){
    const response = await fetch(BACKEND + 'shiftTiming/delete/' + id, {
        method: 'POST',
        headers: getAuthHeader(),
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};


// Visitors API
export async function getAllVisitorsApi() {
    const response = await fetch(BACKEND + 'visitor/getAll', {
      method: 'GET',
      headers: getAuthHeader(),
    });
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    if (!response.ok) {
      throw new Error('Failed to fetch visitors');
    }
    const responseObj = await response.json();
    return responseObj.visitors;
}
  
export async function addVisitorApi(obj, isAdmin){
    const response = await fetch(BACKEND + 'visitor/add', {
        method: 'POST',
        body: obj,
        headers: getAuthHeader(),
    })
    if(response.status == 401){
        if(isAdmin){
            navigate('/auth/adminlogin');
        }
        else{
            navigate('/auth/login');
        }
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateVisitorApprovedApi(id, obj){
    const response = await fetch(`${BACKEND}visitor/approved/${id}`, {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({visitor: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

export async function updateVisitorRejectedApi(id, obj){
    const response = await fetch(`${BACKEND}visitor/rejected/${id}`, {
        method: 'POST',
        observe: 'body',
        headers: getAuthHeader(),
        body: JSON.stringify({leave: obj})
    })
    if(response.status == 401){
        navigate('/auth/adminlogin');
    }
    const responseObj = await response.json();
    const msg = await responseObj.msg;
    return await msg;
};

// Users API
// export async function signUpUserApi(obj) {
//     console.log('Sending signup request for user:', obj);
  
//     const response = await fetch(BACKEND + 'user/signUp', {
//       method: 'POST',
//       headers: headers,
//       body: JSON.stringify({ user: obj })
//     });
  
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.log('Signup request failed:', errorText);
//       throw new Error(`Failed to sign up: ${errorText}`);
//     }
  
//     const responseObj = await response.json();
//     console.log('Signup request successful. Response:', responseObj);
//     return responseObj;
//   }

// export async function logInUserApi(obj) {
//     console.log('Sending login request for user:', obj.email);
    
//     const response = await fetch(BACKEND + 'user/logIn', {
//       method: 'POST',
//       headers: headers,
//       body: JSON.stringify({ user: obj })
//     });
  
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.log('Login request failed:', errorText);
//       throw new Error(`Failed to log in: ${errorText}`);
//     }
  
//     const responseObj = await response.json();
//     console.log('Login request successful. Response:', responseObj);
//     return responseObj;
// }
  

// Admins API
// export async function signUpAdminApi(obj){
//     const response = await fetch(BACKEND + 'admin/signUp', {
//         method: 'POST',
//         observe: 'body',
//         headers: headers,
//         body: JSON.stringify({admin: obj})
//     })
//     const responseObj = await response.json();
//     const msg = await responseObj.msg;
//     return await msg;
// };

export async function signUpAdminApi(obj) {
    console.log('Sending signup request for user:', obj);
  
    const response = await fetch(BACKEND + 'admin/signUp', {
      method: 'POST',
      observe: 'body',
      headers: headers,
      body: JSON.stringify({ admin: obj })
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Signup request failed:', errorText);
      throw new Error(`Failed to sign up: ${errorText}`);
    }
  
    const responseObj = await response.json();
    console.log('Signup request successful. Response:', responseObj);
    return responseObj;
  }

export async function logInAdminApi(obj) {
    console.log('Sending login request for admin:', obj.email);
  
    const response = await fetch(BACKEND + 'admin/logIn', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ admin: obj })
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Login request failed:', errorText);
      throw new Error(`Failed to log in: ${errorText}`);
    }
  
    const responseObj = await response.json();
    if(responseObj.token){
        document.cookie = `adminToken=${responseObj.token}; path=/;`;
        console.log("Cookie: ", getCookie('adminToken'));
    }
    console.log('Login request successful. Response:', responseObj);
    return responseObj;
}

//   export async function logInAdminApi(obj){
//     const response = await fetch(BACKEND + 'admin/logIn',{
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${getCookie('token')}` // Include token in header
//         },
//         body: JSON.stringify({ admin: obj })
//     });
//     console.log('API Response Status:', response.status);
//     console.log("Cookie: ", getCookie('token'));
//     const responseObj = await response.json();
//     console.log('API Response JSON:', responseObj);
//     return responseObj;
// }

// Function to get the token from cookies
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function getAuthHeader() {
    return {
        'Content-Type': 'application/json',
        'authorization': `${getCookie('adminToken')}`
    }
}