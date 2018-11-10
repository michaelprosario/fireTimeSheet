<template>
<div>
Hello {{ name }} from dude... love this
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Test extends Vue {
  @Prop() private name!: string;
}
</script>