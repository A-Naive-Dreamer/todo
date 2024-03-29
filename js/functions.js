let alerts = document.getElementById('alerts'),
  uncompletedTask = document.getElementById('uncompleted-tasks'),
  completedTask = document.getElementById('completed-tasks'),
  tasks = [],
  id = 0,
  a = [],
  b = [],
  c = 1,
  d = 1

function prepareTodo() {
  $('#uncompleted-tasks').empty()
  $('#completed-tasks').empty()

  id = 0
  a = []
  b = []
  c = 1
  d = 1

  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))

    for (let x = 0; x < tasks.length; ++x) {
      if (tasks[x].status === 'uncompleted') {
        let newList = document.createElement('li')

        ++id

        newList.append(c + '. ' + tasks[x].task)

        newList.setAttribute('id', 'uncompleted-task-' + c)
        newList.setAttribute('data-real-id', c)

        console.log(`[${c}] ${tasks[x].task} is uncompleted.`)

        $('#uncompleted-tasks').append(newList)
        a.push(x)

        ++c
      } else if (tasks[x].status === 'completed') {
        let newList = document.createElement('li')

        ++id

        newList.append(d + '. ' + tasks[x].task)

        newList.setAttribute('id', 'completed-task-' + d)
        newList.setAttribute('data-real-id', d)

        console.log(`[${d}] ${tasks[x].task} is completed.`)

        $('#completed-tasks').append(newList)
        b.push(x)

        ++d
      }
    }
  }
}

prepareTodo()

$('#add-new-task').click(function () {
  if ($('#new-task').val() !== '') {
    if (confirm('Are you sure want to add new task?')) {
      tasks.push({
        id: 'task-' + id,
        task: $('#new-task').val(),
        status: 'uncompleted',
        date:
          new Date().getDate() +
          '-' +
          new Date().getMonth() +
          '-' +
          new Date().getFullYear(),
        time:
          new Date().getHours() +
          ':' +
          new Date().getMinutes() +
          ':' +
          new Date().getSeconds()
      })

      localStorage.setItem('tasks', JSON.stringify(tasks))

      console.clear()
      console.log(`[${c}] ${$('#new-task').val()} has been added.`)

      let alert = document.createElement('div'),
        closeButton = document.createElement('button')

      alert.setAttribute('class', 'alert alert-primary alert-dismissible fade show mx-auto')

      closeButton.setAttribute('type', 'button')
      closeButton.setAttribute('class', 'close')
      closeButton.setAttribute('data-dismiss', 'alert')

      alerts.append(alert)
      alert.append(`[${c}] ${$('#new-task').val()} has been added.`)
      alert.append(closeButton)

      closeButton.append(String.fromCharCode(215))

      prepareTodo()
    }
  }
})

$('#mark-task-as-completed').click(function () {
  if (/^[0-9]$/.test($('#completed-task-number').val())) {
    let realId = $('#completed-task-number').val(),
      elem = document.getElementById('uncompleted-task-' + realId)

    uncompletedTask.removeChild(elem)

    tasks[a[realId - 1]].status = 'completed'
    localStorage.setItem('tasks', JSON.stringify(tasks))

    console.clear()
    console.log(`[${realId}] ${tasks[a[realId - 1]].task} has been completed.`)

    let alert = document.createElement('div'),
      closeButton = document.createElement('button')

    alert.setAttribute('class', 'alert alert-success alert-dismissible fade show mx-auto')

    closeButton.setAttribute('type', 'button')
    closeButton.setAttribute('class', 'close')
    closeButton.setAttribute('data-dismiss', 'alert')

    alerts.append(alert)
    alert.append(`[${realId}] ${tasks[a[realId - 1]].task} has been completed.`)
    alert.append(closeButton)

    closeButton.append(String.fromCharCode(215))

    prepareTodo()
  }
})

$('#go-to-fullscreen').click(function () {
  document.documentElement.requestFullscreen()
})

$('#mark-task-as-deleted').click(function () {
  if (/^[0-9]$/.test($('#deleted-task-number').val())) {
    if (confirm('Are you sure want to delete task?')) {
      let realId = $('#deleted-task-number').val(),
        elem = document.getElementById('completed-task-' + realId)

      completedTask.removeChild(elem)

      tasks[b[realId - 1]].status = 'deleted'
      localStorage.setItem('tasks', JSON.stringify(tasks))

      console.clear()
      console.log(`[${realId}] ${tasks[b[realId - 1]].task} has been deleted.`)

      let alert = document.createElement('div'),
        closeButton = document.createElement('button')

      alert.setAttribute('class', 'alert alert-danger alert-dismissible fade show mx-auto')

      closeButton.setAttribute('type', 'button')
      closeButton.setAttribute('class', 'close')
      closeButton.setAttribute('data-dismiss', 'alert')

      alerts.append(alert)
      alert.append(`[${realId}] ${tasks[b[realId - 1]].task} has been deleted.`)
      alert.append(closeButton)

      closeButton.append(String.fromCharCode(215))

      prepareTodo()
    }
  }
})

$('#mark-task-as-updated').click(function () {
  if (
    /^[0-9]$/.test($('#updated-task-number').val()) &&
    $('#new-task-value').val() !== ''
  ) {
    if (confirm('Are you sure want to update task value?')) {
      let realId = $('#updated-task-number').val(),
        elem = document.getElementById('uncompleted-task-' + realId)

      uncompletedTask.removeChild(elem)

      console.clear()
      console.log(`[${realId}] ${tasks[a[realId - 1]].task} has been updated.`)

      let alert = document.createElement('div'),
        closeButton = document.createElement('button')

      alert.setAttribute('class', 'alert alert-warning alert-dismissible fade show mx-auto')

      closeButton.setAttribute('type', 'button')
      closeButton.setAttribute('class', 'close')
      closeButton.setAttribute('data-dismiss', 'alert')

      alerts.append(alert)
      alert.append(`[${realId}] ${tasks[a[realId - 1]].task} has been updated.`)
      alert.append(closeButton)

      closeButton.append(String.fromCharCode(215))

      tasks[a[realId - 1]].task = $('#new-task-value').val()
      localStorage.setItem('tasks', JSON.stringify(tasks))

      prepareTodo()
    }
  }
})

$('body').css('height', innerHeight + 'px')
