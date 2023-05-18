<template>
    <div :class="$style.container">
        <div :class="$style.coverBox">
            <div
                :class="$style.itemBox"
                v-for="item in productsArray"
                :key="item.id"
            >
                <router-link :to="`/articles?id=${getProduct(item).id}`">
                    <div
                        :class="$style.thumbnail"
                        :style="getBackgroundImage(getProduct(item))"
                    ></div>
                    <div :class="$style.textBox">
                        <div :class="$style.name">
                            {{ getProduct(item).name }}
                        </div>
                        <div :class="$style.price">
                            {{ convertPrice(item) }}
                        </div>
                        <div :class="$style.description">
                            {{ getRegisteredUser(item).location }}
                        </div>
                        <div :class="$style.likeBox">
                            <div :class="$style.likes">
                                관심 {{ getProduct(item).likes }} · 채팅
                                {{ getProduct(item).chats }}
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import contentsList from "@/assets/contents.json";
import { Product, User } from "@/structure/types";

@Component({
    components: {},
})
export default class ProductsContainer extends Vue {
    productsArray: Product[] = [];

    @Prop() checkNumber?: number;

    mounted() {
        this.setProductsArray();

        if (this.checkNumber == undefined) {
            this.setSmallArray();
        } else {
            this.setProductsArray();
        }
    }

    setSmallArray() {
        let smallerArray: Product[] = [];

        for (
            let i: number = 0;
            i < Math.min(4, this.productsArray.length);
            i++
        ) {
            smallerArray[i] = this.productsArray[i];
        }

        this.productsArray = smallerArray;
    }
    setProductsArray() {
        this.productsArray = contentsList.products as Product[];
    }

    getBackgroundImage(item: Product): {} {
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

.container {
    .coverBox {
        max-width: 1080px;

        display: flex;
        flex-wrap: wrap;

        @include setCenter;

        .itemBox {
            width: calc(100% / 4);

            padding: 20px;

            a {
                text-decoration: none;

                color: rgb(33, 37, 41);
            }

            .thumbnail {
                $thumbnail: 210px;

                width: $thumbnail;
                height: $thumbnail;

                border-radius: 20px;

                background-size: cover;
                background-repeat: no-repeat;
                background-position: center center;

                @include setCenter;
            }

            .textBox {
                padding-left: 6px;

                text-align: left;

                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;

                .name {
                    padding-top: 10px;

                    font-size: 16px;
                }

                .price {
                    padding-top: 6px;

                    font-size: 15px;
                    font-weight: bold;
                }

                .description {
                    padding-top: 6px;

                    font-size: 13px;
                }

                .likeBox {
                    display: flex;

                    .likes {
                        padding-top: 4px;

                        font-size: 13px;

                        color: #868e96;
                    }
                }
            }
        }
    }
}
</style>
