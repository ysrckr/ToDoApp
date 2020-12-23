const addForm = document.querySelector('.add')
const addInput = document.querySelector('.add-input')
const list = document.querySelector('.list')
const listItem = document.querySelector('.list-item')
const editBtn = document.querySelector('.edit-btn')
const http = 'http://localhost:5000'

addEventListener('DOMContentLoaded', async () => {
	try {
		const response = await fetch(http)
		const data = await response.json()
		console.log(data)
		data.map(item => {
			list.innerHTML += `<li class="list-item" data-id=${item.id}>
		<span class="text">${item.body}</span>
		<span class="edit"><i class="far fa-edit"></i></span
		><span class="delete"><i class="fas fa-trash"></i></span>
	</li>`
		})
	} catch (err) {
		console.log(err.message)
	}
	addInput.focus()
})

addForm.addEventListener('submit', async e => {
	e.preventDefault()
	const value = addInput.value.trim()
	console.log(JSON.stringify(value))
	try {
		const res = await fetch(http, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ body: value }),
		})
		const data = await res.json()
		if (data) {
			list.innerHTML += `<li class="list-item" data-id=${data.id}>
		<span class="text">${data.body}</span>
		<span class="edit"><i class="far fa-edit"></i></span
		><span class="delete"><i class="fas fa-trash"></i></span>
	</li>`
		}
	} catch (err) {
		console.log(err.message)
	}
})

list.addEventListener('click', async e => {
	try {
		if (e.target.classList.contains('fa-trash')) {
			const listItem = e.target.parentElement.parentElement
			console.log(listItem.dataset.id)
			const res = await fetch(`${http}/${listItem.dataset.id}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
			})
			if (res.status == 204) {
				e.target.parentElement.parentElement.remove()
			}
		}
	} catch (err) {
		console.log(err.message)
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
