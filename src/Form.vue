<script setup>
import { ref, watch } from 'vue';
const refFormAccount = ref();
const refFormDeal = ref();
const refOutputResponseAccount = ref();
const refOutputResponseDeal = ref();
const outputResponseAccount = ref();
const outputResponseDeal = ref();

const submit = async (refForm, path) => {
  let formData = new FormData(refForm);
  try {
    const response = await fetch(`/api/${path}`, {
      method: 'POST',
      body: formData,
    });

    if (path == 'accounts') outputResponseAccount.value = await response.json();
    if (path == 'deals') outputResponseDeal.value = await response.json();
  } catch (e) {}
};

watch([outputResponseAccount, refOutputResponseAccount], () => {
  if (!(refOutputResponseAccount.value && outputResponseAccount.value)) return;

  const message = JSON.stringify(outputResponseAccount.value);

  refOutputResponseAccount.value.textContent = `${message}`;
});

watch([outputResponseDeal, refOutputResponseDeal], () => {
  if (!(refOutputResponseDeal.value && outputResponseDeal.value)) return;

  const message = JSON.stringify(outputResponseDeal.value);

  refOutputResponseDeal.value.textContent = `${message}`;
});
</script>

<template>
  <div>
    <div>
      <h3>Form</h3>
    </div>
    <div>
      <form
        :ref="(el) => (refFormAccount = el)"
        @submit.prevent="() => submit(refFormAccount, 'accounts')"
      >
        <h3 :class="$style.formTitleH3">Account Form</h3>
        <p
          :ref="(el) => (refOutputResponseAccount = el)"
          :class="
            outputResponseAccount == undefined
              ? ''
              : outputResponseAccount.success
              ? $style.success
              : $style.failure
          "
        ></p>
        <p>Account name</p>
        <input :name="`accountName`" placeholder="Account Name in Zoho CRM" />
        <p></p>
        <p>Account website</p>
        <input :name="`accountWebsite`" placeholder="Website in Zoho CRM" />
        <p>Account phone</p>
        <input :name="`accountPhone`" placeholder="Phone in Zoho CRM" />
        <p></p>
        <div :class="$style.buttonContainerDiv">
          <input :type="`submit`" :value="`Submit Account`" />
        </div>
      </form>
      <form
        :ref="(el) => (refFormDeal = el)"
        @submit.prevent="() => submit(refFormDeal, 'deals')"
      >
        <h3 :class="$style.formTitleH3">Deal Form</h3>
        <p
          :ref="(el) => (refOutputResponseDeal = el)"
          :class="
            outputResponseDeal == undefined
              ? ''
              : outputResponseDeal.success
              ? $style.success
              : $style.failure
          "
        ></p>
        <p>Deal name</p>
        <input :name="`dealName`" placeholder="Deal Name in Zoho CRM" />
        <p></p>
        <p>Deal stage</p>
        <input :name="`dealStage`" placeholder="Deal stage in Zoho CRM" />
        <p></p>
        <div :class="$style.buttonContainerDiv">
          <input :type="`submit`" :value="`Submit Deal`" />
        </div>
      </form>
    </div>
  </div>
</template>

<style module>
a {
  color: blue;
}
input {
  padding: 0.3rem;
  border: 1px grey solid;
  width: 100%;
}
.formContainerDiv {
  margin-bottom: 2rem;
}
.formTitleH3 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.buttonContainerDiv {
  margin: 0.3rem;
  width: fit-content;
}
.success {
  white-space: pre-line;
  margin: 0.5rem;
  padding: 0.5rem;
  border: 2px green solid;
  color: darkslategrey;
  font-size: 0.7rem;
  border-radius: 1rem;
}
.failure {
  white-space: pre-line;
  margin: 0.5rem;
  padding: 0.5rem;
  border: 3px red solid;
  border-radius: 1rem;
  color: darkred;
  font-size: 0.7rem;
}
</style>
