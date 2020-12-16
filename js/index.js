const addForm = document.querySelector('.add')
const addInput = document.querySelector('.add-input')
const list = document.querySelector('.list')
const editBtn = document.querySelector('.edit-btn')

addForm.addEventListener('submit', e => {
	e.preventDefault()
	list.innerHTML += `
<li class="list-item">
						<span class="text">${addInput.value.trim()}</span>
						<span class="edit"><i class="far fa-edit"></i></span
						><span class="delete"><i class="fas fa-trash"></i></span>
					</li>
`
	addInput.value = ''
})

list.addEventListener('click', e => {
	if (e.target.classList.contains('fa-trash')) {
		e.target.parentElement.parentElement.remove()
	}
})

list.addEventListener('click', e => {
	if (e.target.classList.contains('fa-edit')) {
		const editText =
			e.target.parentElement.previousSibling.previousSibling.textContent
		const listElement = e.target.parentElement.parentElement
		addInput.value = editText
		editBtn.classList.toggle('invisible')
		editBtn.addEventListener('submit', e => {
			e.preventDefault()
			listElement.remove()
		})
	}
})
