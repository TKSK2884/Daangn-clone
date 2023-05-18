<template>
    <div :class="$style.mainContainer">
        <div :class="$style.coverContainer">
            <div :class="$style.container">
                <div :class="$style.title">중고거래</div>
                <div :class="$style.coverBox">
                    <div
                        :class="$style.itemBox"
                        v-for="item in productsArray"
                        :key="item.id"
                    >
                        <router-link :to="`/articles?id=${item.id}`">
                            <div
                                :class="$style.thumbnail"
                                :style="getBackgroundImage(item)"
                            ></div>
                            <div :class="$style.textBox">
                                <div :class="$style.name">
                                    {{ getProduct(item).name }}
                                </div>
                                <div :class="$style.description">
                                    {{ getRegisteredUser(item).location }}
                                </div>
                                <div :class="$style.priceBox">
                                    <div :class="$style.price">
                                        {{ convertPrice(item) }}원
                                    </div>
                                    <div :class="$style.mark"></div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div v-on:click="setProductArray()" :class="$style.bottomTitle">
                    더보기
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import contentsList from "@/assets/contents.json";
import { Product, User } from "@/structure/types";

@Component({
    components: {},
})
export default class Search extends Vue {
    productsArray: Product[] = [];

    mounted() {
        this.setProductArray();

        this.setSmallArray();
    }

    setSmallArray() {
        let smallerArray: Product[] = [];

        for (
            let i: number = 0;
            i < Math.min(6, this.productsArray.length);
            i++
        ) {
            smallerArray[i] = this.productsArray[i];
        }

        this.productsArray = smallerArray;
    }

    getBackgroundImage(item: any) {
        if (item.images.length == 0) {
            return {};
        }

        return {
            backgroundImage: `url("${item.images[0]}")`,
        };
    }

    convertPrice(item: Product): string {
        return item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    setProductArray() {
        this.productsArray = contentsList.products as Product[];
    }

    getRegisteredUser(item: Product): User {
        return (
            item.registered_by ?? {
                name: "",
                location: "",

                temperature: 0,
            }
        );
    }

    getProduct(item: Product): Product {
        return (
            item ?? {
                id: "",
                name: "",
                price: 0,
                likes: 0,
                chats: 0,
                images: [],
                registered_by: this.getRegisteredUser(item),
                is_hidden: false,
            }
        );
    }
}
</script>

<style lang="scss" module>
@import "@/assets/utils.scss";

.mainContainer {
    .coverContainer {
        padding-top: 80px;
        padding-bottom: 60px;

        background-color: #f8f9fa;
        .container {
            margin-top: 10px;

            max-width: 800px;

            border: 1px solid #dddfe5;
            border-radius: 15px;

            background-color: #ffffff;

            @include setCenter;

            .title {
                padding-top: 20px;
                padding-left: 40px;

                font-size: 18px;
                font-weight: bold;
            }

            .coverBox {
                display: flex;
                flex-wrap: wrap;

                max-width: 730px;

                @include setCenter;

                .itemBox {
                    width: calc(100% / 3);

                    padding: 10px;

                    a {
                        text-decoration: none;

                        color: rgb(33, 37, 41);
                    }

                    .thumbnail {
                        width: 210px;
                        height: 180px;

                        margin-top: 20px;

                        border-radius: 15px;

                        background-size: cover;
                        background-repeat: no-repeat;
                    }

                    .textBox {
                        .name {
                            padding-top: 10px;

                            font-size: 16px;
                            font-weight: bold;

                            text-overflow: ellipsis;

                            white-space: nowrap;
                            overflow: hidden;
                        }
                    }

                    .description {
                        font-size: 14px;

                        color: #b9bdc8;
                    }

                    .priceBox {
                        display: flex;
                        justify-content: space-between;

                        .price {
                            color: #ff6e1d;
                        }

                        .mark {
                            width: 20px;
                            height: 20px;

                            margin-right: 25px;

                            background-image: url("@/assets/heart_small.svg");
                            background-repeat: no-repeat;
                            background-position: center center;
                        }
                    }
                }
            }

            .bottomTitle {
                width: 100%;

                padding-top: 20px;
                padding-bottom: 20px;

                text-align: center;

                border-top: 1px solid #dddfe5;
            }
        }
    }
}
</style>
