<template>
    <div :class="$style.mainContainer">
        <div :class="$style.bannerContainer">
            <div :class="$style.textSection">
                <div :class="$style.textBox">
                    <div :class="$style.boldText">
                        우리 동네에서 찾는<br />
                        당근알바
                    </div>
                    <div :class="$style.text">
                        걸어서 10분 거리의<br />
                        동네 알바들 여기 다 있어요.
                    </div>
                </div>
            </div>
            <div :class="$style.imageBox">
                <div :class="$style.image"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class JobView extends Vue {
    mounted() {
        this.$store.commit("setDarkMode", true);
    }
}
</script>

<style lang="scss" module>
@import "@/assets/utils.scss";

.mainContainer {
    width: 100%;

    background-color: #ffe2d2;

    .bannerContainer {
        max-width: 1200px;
        height: 315px;

        margin-top: 64px;

        position: relative;

        display: flex;

        @include setCenter;

        .textSection {
            width: 50%;

            text-align: center;

            @include textSection;
        }
        .imageBox {
            position: absolute;

            bottom: 0;
            right: 0;

            .image {
                width: 603px;
                height: 260px;

                background-image: url("@/assets/job_banner.png");
                background-size: contain;
                background-repeat: no-repeat;
            }
        }
    }
}
</style>
