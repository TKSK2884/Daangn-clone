<template>
    <div :class="$style.mainContainer">
        <div :class="$style.container">
            <div :class="$style.title">중고거래 인기매물</div>

            <ProductsContainer :checkNumber="8" />

            <div :class="$style.bottomContainer">
                <div :class="$style.title">더 구경하고 싶나요?</div>
                <div :class="$style.text">
                    당근마켓 앱에서 따듯한 거래를 직접 경험해보세요!
                </div>
                <div :class="$style.buttonBox">
                    <a
                        href="https://apps.apple.com/kr/app/%EB%8B%B9%EA%B7%BC%EB%A7%88%EC%BC%93-%EC%A4%91%EA%B3%A0%EA%B1%B0%EB%9E%98-%ED%95%84%EC%88%98%EC%95%B1/id1018769995"
                        ><div :class="$style.button">App Store</div></a
                    >
                    <a
                        href="https://play.google.com/store/apps/details?id=com.towneers.www"
                        ><div :class="$style.button">Google Play</div></a
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import contentsList from "@/assets/contents.json";
import ProductsContainer from "@/components/ProductsContainer.vue";
import { Product } from "@/structure/types";

@Component({
    components: {
        ProductsContainer,
    },
})
export default class HotArticles extends Vue {
    productsArray: Product[] = [];

    mounted() {
        this.productsArray = contentsList.products as Product[];
    }

    getBackgroundImage(item: Product) {
        if (item.images.length == 0) {
            return {};
        }

        return {
            backgroundImage: `url("${item.images[0]}")`,
        };
    }
}
</script>

<style lang="scss" module>
@import "@/assets/utils.scss";

.mainContainer {
    .container {
        .title {
            padding-top: 80px;
            padding-bottom: 80px;

            font-size: 40px;
            font-weight: bold;

            text-align: center;
        }
        .bottomContainer {
            padding-top: 60px;
            padding-bottom: 90px;

            margin-left: auto;
            margin-right: auto;

            text-align: center;

            background-color: #f8f9fa;

            .title {
                padding-top: 30px;
                padding-bottom: 30px;

                font-size: 22px;
                font-weight: bold;
            }

            .text {
                padding-bottom: 10px;

                font-size: 15px;
            }

            .buttonBox {
                max-width: 330px;

                display: flex;
                justify-content: space-between;

                @include setCenter;

                a {
                    text-decoration: none;
                }

                .button {
                    width: 150px;

                    padding-top: 15px;
                    padding-bottom: 15px;

                    margin-top: 15px;
                    margin-right: 15px;

                    font-weight: bold;

                    border-radius: 10px;

                    color: white;
                    background-color: #f58c50;

                    @include setCenter;
                }
            }
        }
    }
}
</style>
