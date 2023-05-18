<template>
    <div :class="$style.mainContainer">
        <div :class="$style.bannerContainer">
            <div :class="$style.textSection">
                <div :class="$style.textBox">
                    <div :class="$style.boldText">
                        복비없이 투명한<br />
                        부동산 직거래
                    </div>
                    <div :class="$style.text">
                        이웃이 살던 집, 당근마켓에서<br />
                        편하게 직거래해보세요.
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
export default class RealtyView extends Vue {
    mounted() {
        this.$store.commit("setDarkMode", true);
    }
}
</script>

<style lang="scss" module>
@import "@/assets/utils.scss";

.mainContainer {
    width: 100%;

    background-color: #d2edfa;

    .bannerContainer {
        max-width: 1200px;
        height: 315px;

        margin-top: 64px;

        display: flex;

        position: relative;

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

                background-image: url("@/assets/realty_banner.png");
                background-size: contain;
                background-repeat: no-repeat;
            }
        }
    }
}
</style>
