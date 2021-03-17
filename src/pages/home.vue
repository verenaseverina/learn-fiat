<template>
  <section>
    <header class="p-16 bg-blue-50">
      <div class="f-title title-14 text-white">
        Panin
      </div>
    </header>

    <section class="p-16">
      <div class="f-title title-12 secondary mb-12">
        CREDIT CARD NUMBER <i @click="modal">?</i>
      </div>
      <div>
        <f-input
          format="{4} {4} {4} {4}"
          placeholder="Placeholder"
          inputType="text-box"
          v-model="bankCard"
          type="digital"
          :errorMsg="errorMsg"
        />
      </div>
    </section>

    <section class="p-16">
      <f-input-money 
      label="PAYMENT AMOUNT" 
      placeholder="50.000" 
      input-type="text-field-amount"
      :min-amount="currentPayerMinAmount"
      :min-error-placeholder="minErrorPlaceholder"
      :hide-error-text="errorMoney"
      v-model="amount"
      >
        <template slot="icon-inner">
          <div class="f-input__icon-outer-right mr-16">
            <img src="//a.m.dana.id/resource/imgs/fiat/currency.svg?t=1" width="200%"/>
          </div>
        </template>
      </f-input-money>
    </section>
    <section class="p-16">
      <f-btn class="mb-8" :disabled="isDisabled"> Check Bill </f-btn>
    </section>

    <section>
      <f-dialog type="modal" v-model="toggle">
      <f-card class="p-12 pt-16">
        <f-card-content class="f-text-center">
          <div class="f-title title-16 my-8">
            How To Find Your Credit Card Number
          </div>
          <div class="f-caption caption-12 mb-12">
            Find the 16 16 digits number on the front of your part of your credit card
          </div>
          <f-card-img w="200">
            <img 
            src="https://lh3.googleusercontent.com/proxy/b_ZWwXphxuh6-i_1L25bt4AeyvLGgHLCbDDFty9BsjVgrpyv-HrWtIWL4bkEffQGLbXNiuB9RzDtot4xSeNwZ1xqAC1XAgh6SV8NzIaUWOVJ1h68naUitSNP"/>
          </f-card-img>
        </f-card-content>
        <f-card-actions stacked class="mt-16">
          <f-btn size="small" @click="modal">
            GOT IT!
          </f-btn>
        </f-card-actions>
      </f-card>
    </f-dialog>
    </section>
  </section>
</template>

<script>
import { FBtn, FInput, FInputMoney, FDialog, FCard, FCardContent, FCardActions, FCardImg } from '@dana/fiat'
export default {
  data(){
    return{
      bankCard: "",
      errorMsg: "",
      isDisabled: true,
      amount: 0,
      currentPayerMinAmount: 50000,
      minErrorPlaceholder: "The minimun amount for credit card payment is Rp50.000",
      errorMoney: true,
      toggle: false,
    }
  },
  components: {
    FBtn,
    FInput,
    FInputMoney,
    FDialog,
    FCard,
    FCardContent,
    FCardActions,
    FCardImg
  },
  methods: {
    modal(){
      this.toggle = !this.toggle;
    }
  },
  watch:{
    bankCard(){

      if(this.bankCard === "" || this.bankCard.length === 19){
        this.errorMsg = "";
      }else{
        this.errorMsg = "The credit card number must be 16 digits.";
      }
      if(this.amount !== 0){
        const a = parseInt(this.amount.replaceAll('.', ''));
        if(this.bankCard.length === 19 && a >= this.currentPayerMinAmount){
        this.isDisabled = false;
        }else{
          this.isDisabled = true
        }
      }
      
    },
    amount(){
      const a = parseInt(this.amount.replaceAll('.', ''));
      if(this.amount === 0 || a >= this.currentPayerMinAmount){
        this.errorMoney = true;
      }else{
        this.errorMoney = false;
      }

      if(this.bankCard.length === 19 && a >= this.currentPayerMinAmount){
        this.isDisabled = false;
      }else{
        this.isDisabled = true
      }
    },
  }
}
</script>

