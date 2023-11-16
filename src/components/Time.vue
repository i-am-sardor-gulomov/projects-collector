<script setup>
const currentTime = ref('')
const currentDate = ref('')

function updateTimeAndDate() {
  const now = new Date()

  let hours = now.getHours()
  let minutes = now.getMinutes()
  let seconds = now.getSeconds()

  hours = hours < 10 ? `0${hours}` : hours
  minutes = minutes < 10 ? `0${minutes}` : minutes
  seconds = seconds < 10 ? `0${seconds}` : seconds

  currentTime.value = `${hours}:${minutes}:${seconds}`

  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()

  const formattedMonth = month < 10 ? `0${month}` : month
  const formattedDay = day < 10 ? `0${day}` : day

  currentDate.value = `${formattedDay}/${formattedMonth}/${year}`
}

onMounted(updateTimeAndDate)

setInterval(updateTimeAndDate, 1000)
</script>

<template>
  <div grid mr-2 text-12px>
    <span>{{ currentTime }}</span>
    <span>{{ currentDate }}</span>
  </div>
</template>
