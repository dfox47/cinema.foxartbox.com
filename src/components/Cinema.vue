<template>
	<div>
		<div ref="container" class="cinema"></div>

		<button
			class="submit-form"
			@click="cinemaSendForm()"
			:disabled="isDisabledSubmit"
		>
			Отправить
		</button>
	</div>
</template>

<script setup>
import { useTimestamp } from "@vueuse/core"
import { onMounted, ref } from "vue"
import { useCinemaStore } from "@/store/useCinemaStore"
import Konva from "konva"

const container = ref(null)
const stage = ref(null)
const seats = ref([])
const isDisabledSubmit = ref(true)
const userSeatsArray = ref([])
const timestamp = useTimestamp({ offset: 0 })
const cinemaStore = useCinemaStore()

console.log(timestamp)

const cinemaSendForm = () => cinemaStore.submitSeat(userSeatsArray.value)

onMounted(() => {
	stage.value = new Konva.Stage({
		container:      container.value,
		height:         600,
		width:          1024,
	})

	const layer = new Konva.Layer()

	stage.value.add(layer)

	const screen = new Konva.Rect({
		cornerRadius: 10,
		fill: "black",
		height: stage.value.height() - 200,
		width: stage.value.width() - 140,
		x: 20,
		y: 20,
	})

	layer.add(screen)

	const seatWidth = 50
	const seatHeight = 50
	const seatMargin = 10
	const numRows = 5
	const numCols = 8

	const offsetX = (stage.value.width() - (numCols * seatWidth + (numCols - 1) * seatMargin)) / 2
	const offsetY = (stage.value.height() - (numRows * seatHeight + (numRows - 1) * seatMargin)) / 2

	for (let row = 0; row < numRows; row++) {
		for (let col = 0; col < numCols; col++) {
			const seat = new Konva.Rect({
				x: offsetX + col * (seatWidth + seatMargin) - seatWidth,
				y: offsetY + row * (seatHeight + seatMargin) - seatHeight,
				width: seatWidth,
				height: seatHeight,
				fill: "gray",
				stroke: "black",
				strokeWidth: 1,
			})

			seat.row = row

			seat.col = col

			seat.selected = false

			seat.id = col + 1

			layer.add(seat)

			seat.on("click", () => {
				seat.selected = !seat.selected

				isDisabledSubmit.value = false

				if (seat.selected) {
					userSeatsArray.value.push({
						UserId: "2",
						PointId: `${col + 1} / ${row + 1}`,
						Time: timestamp,
					})
				}
				else {
					userSeatsArray.value = userSeatsArray.value.filter(
						(el) => el.selected == seat.selected
					)
				}

				cinemaStore.bookedSeat(
					`Место: ${col + 1}`,
					`Ряд: ${row + 1}`,
					"Детектив пикачу",
					seat.selected
				)

				seat.fill(seat.selected ? "blue" : "gray")

				layer.batchDraw()
			})

			seat.on("mouseover", () => {
				seat.tooltip.opacity(1)
				layer.batchDraw()
			})

			seat.on("mouseout", () => {
				seat.tooltip.opacity(0)
				layer.batchDraw()
			})

			const tooltip = new Konva.Label({
				x: seat.x() + seat.width() / 2,
				y: seat.y() + seat.height() + 10,
				opacity: 0,
			})

			tooltip.add(
				new Konva.Tag({
					fill: "red",
					pointerDirection: "none",
					pointerWidth: 10,
					pointerHeight: 10,
					lineJoin: "round",
					cornerRadius: 20,
				})
			)

			tooltip.add(
				new Konva.Text({
					text: `Место: ${col + 1}, Ряд: ${row + 1}, Детектив пикачу`,
					fontFamily: "Arial",
					fontSize: 14,
					padding: 5,
					fill: "white",
				})
			)

			layer.add(tooltip)

			seat.tooltip = tooltip
		}
	}

	seats.value = layer.find("Rect")

	layer.draw()
})
</script>

<style>
body {
	margin: 0;
	padding: 0;
	overflow: hidden;
}

.cinema-tolltip {
	padding: 12px;
	width: 100px;
	height: 100px;
	position: absolute;
}

.submit-form {
	position: absolute;
	bottom: 200px;
	left: 50%;
	transform: translate(-50%);
	background: #fff;
	color: #000;
	padding: 20px;
}
</style>
