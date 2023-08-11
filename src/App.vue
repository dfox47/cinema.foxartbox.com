<template>
	<HeaderMain />
	<router-view />
	<FooterMain />
</template>

<script>
import FooterMain from '@/components/FooterMain'
import HeaderMain from '@/components/HeaderMain'

export default {
	name: 'App',
	components: {
		FooterMain,
		HeaderMain
	}
}
</script>

<style lang="scss">@import 'assets/css/_styles.scss';</style>