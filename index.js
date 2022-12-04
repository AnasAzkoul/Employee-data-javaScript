(async function () {
  // Fetch data and add to the state ---------------------------------
  const response = await fetch('./data.json'); 
  const data = await response.json(); 
  
  let employees = data; 
  let selectedEmployeeId = employees[0].id;  
  let selectedEmployee = employees[0]; 

  
  const list = document.querySelector('#list'); 
  const info = document.querySelector('#info'); 
  
  // Add new employee logic -----------------------------------------
  const addEmployeeBtn = document.querySelector('#addEmployee'); 
  const addEmployeeModal = document.querySelector('.addEmployeeModal'); 
  const addEmployeeForm = document.querySelector('.addEmployee__form'); 
  
  
  addEmployeeBtn.addEventListener('click', (e) => {
    addEmployeeModal.style.display = 'flex'
  })
  
  addEmployeeModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('addEmployeeModal')) {
      addEmployeeModal.style.display = 'none'
    }
  })
  
  addEmployeeForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const formData = new FormData(addEmployeeForm); 
    const values = [...formData.entries()]; 
    const empData = {}; 
    values.forEach(item => {
      empData[item[0]] = item[1]
    })
    
    empData.id = ((+employees[employees.length - 1].id) + 1).toString(); 
    empData.imageUrl = empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png"; 
    addEmployeeForm.reset(); 
    employees.push(empData); 
    addEmployeeModal.style.display = 'none'
    
    renderEmployees(); 
    console.log(employees)
  })
  
  // select employee logic -------------------------------------------
  // use event delegation to handle multiple events inside the container 
  list.addEventListener('click', (e) => {
    if (e.target.tagName === 'DIV' && e.target.id !== selectedEmployeeId) {
      selectedEmployeeId = e.target.id; 
      renderEmployees(); 
      renderSingleEmployee(); 
    }
    
    if (e.target.tagName === 'BUTTON') {
      console.log(e.target.parentElement.id); 
      
      employees.forEach((emp, index) => {
        if (emp.id === e.target.parentElement.id) {
          e.target.parentElement.remove(); 
          employees.splice(index, 1); 
          renderSingleEmployee(); 
        }
      })
    }
  })
  
  // Render Employee list logic ---------------------------------------
  const renderEmployees = () => {
    list.innerHTML = ''; 
    employees.forEach(emp => {
      const employee = document.createElement('div'); 
      employee.classList.add('employee'); 
      employee.innerHTML = `
        ${emp.firstName} ${emp.lastName}
        <button class='delete-btn'>X</button>
      `; 
            
      if (selectedEmployeeId === emp.id) {
        selectedEmployee = emp;         
        employee.classList.add('selected')
      }
      
      employee.setAttribute('id', emp.id); 
      list.appendChild(employee); 
    })
  }
  
  // render single employee -----------------------------------------
  
  const renderSingleEmployee = () => {
    if (employees.length) {
      const {
        firstName,
        imageUrl,
        lastName,
        email,
        contactNumber,
        age,
        dob,
        salary,
        address
      } = selectedEmployee; 
      info.innerHTML = `
        <div class='image-container'>
          <img src="${imageUrl}" alt="" />
        </div>
        <p>${firstName} ${lastName}</p>
        <p>${email}</p>
        <p>${contactNumber}</p>
        <p>${age}</p>
        <p>${dob}</p>
        <p>${salary}</p>
        <p>${address}</p>
      `
    } else {
      info.innerHTML = ''; 
    }

  }
  // -----------------------------------------------------
  renderEmployees(); 
  renderSingleEmployee(); 
})(); 
