<template>
<div class="input-wrapper">
    <form id="reviewForm">
        <div class="stars">
            <h3>Add a public review for this product</h3>
            <p>
                How many stars would you give to this product? 
                "1" being the least preferable and "5" being the most. 
                <!-- <br><br><img :src="require(this.userReview.userImage.name)" alt="Image not found"/> -->
            </p>
            <div class="rate">
                <star-rating :max-rating=5 v-model:rating="userReview.stars"/>
            </div>
        </div>
        <div class="title">
            <p>Sum up your review in one line.</p>
        <input type="text" name="title" placeholder="Review Title" v-model="userReview.title">
        </div>
        <div class="photos">
            <h3>Add a photo of your item </h3>
            <p>Your fellow shoppers will find this more useful than text alone.</p>
            <input type="file" id="pic" accept="image/*" @change="fileSelected">
        </div>
        <div class="review">
            <h3>Add a detailed review</h3>
            <p>You may please share an in depth review of this product based on your experience.</p>
        <textarea name="review" placeholder="How do you like the product?" v-model="userReview.review"/>
        <div class="submitButton">
        <Button v-on:submit.prevent="saveComment" method="POST"/>
        </div>
        </div>
    </form>
</div>
</template>

<script>
import Button from "../components/Button.vue"
import StarRating from 'vue-star-rating'
import { mapActions, mapGetters } from "vuex";

export default {
data(){
    return{
        userReview: {
            title:"",
            review:"",
            stars:0,
            user:"swagat",
            userImage:{
                type: Object,
                default: null,
            },

        },
    }
},
components:{
Button,
StarRating,
},
props: {
    productId:{
      type: String,
      default: ""
    },
},
computed:{
    ...mapGetters("cart",["getProductFromWishlist"])
},
methods:{
    ...mapActions("cart", [
      "updateProduct",
    ]),
    saveComment()
    {
        console.log(this.userReview.title +" "+ this.userReview.review);
        if(this.userReview.title != "" && this.userReview.review != "")
        {
            console.log("productId : ", this.productId)
            let product = this.getProductFromWishlist(this.productId);
            let comments = product[0]["comments"];
            //console.log("before : ", comments);
            comments = [...comments, this.userReview];
            //console.log("after : ", comments);

            this.updateProduct({productId: product[0]["id"],key: "comments",value: comments});
            //alert("Thanks! Your review matters.");
        }
        else
        {
            alert("The review title and details can't be empty.");
        }

    },
    fileSelected(event){
        console.log(event);
        this.userReview.userImage = event.target.files[0];
        console.log("You uploaded: "+ this.userReview.userImage.name);
    }
}
}

</script>

<style lang="scss" scoped>
.input-wrapper{
    //display: none;
    box-shadow: 0 4px 12px 0px rgb(0 0 0 / 10%);
    border-style: ridge;
    #reviewForm 
        {
            .stars{
                padding: 20px;
                box-shadow: 4px 0px 4px 0px rgb(0 0 0 / 20%);
                flex-direction: column;

                .rate {
                height: 46px;
                padding: 0 10px;
                display: flex;
                }
                
            }
            .title{
                margin-left: 20px;
                margin-bottom: 20px;
            }
            .photos{
                margin-left: 20px;
                margin-bottom: 20px;
                box-shadow: 4px 0px 4px 0px rgb(0 0 0 / 20%);
            }
            .review{
                margin-left: 20px;
                margin-bottom: 20px;
                textarea{
                    width: 50%;
                    height: 150px;
                }
            .submitButton{
                padding: 20px;
                display: flex;
            }
        }
    }
}

</style>