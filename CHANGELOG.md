## [2.0.2](https://github.com/SocialGouv/onvs/compare/v2.0.1...v2.0.2) (2020-09-25)


### Bug Fixes

* Add prefix to preprod env. ([f6a748c](https://github.com/SocialGouv/onvs/commit/f6a748c5568cb8687a5081ba1fa054f315a3114f))

## [2.0.1](https://github.com/SocialGouv/onvs/compare/v2.0.0...v2.0.1) (2020-09-25)


### Bug Fixes

* **release:** trigger path ([3fb21d0](https://github.com/SocialGouv/onvs/commit/3fb21d04543b33c72232e38ecf24f3635ba2ed2a))

# 1.0.0 (2020-09-25)


### Bug Fixes

* **docker:** do not copy .env ([b29c3ab](https://github.com/SocialGouv/onvs/commit/b29c3ab3e6805c35d5e1b7c1a44d18161e88705a))
* bug when watch expression is empty at first ([470abe7](https://github.com/SocialGouv/onvs/commit/470abe77a3767b61f9b6ff7b6b37039ce627e86a))
* **form:** discrimination checkbox was a boolean and not an array ([326e42d](https://github.com/SocialGouv/onvs/commit/326e42da616005d13df034e304382bdf24c10ded))
* **test:** need to update data in tests ([a57a51f](https://github.com/SocialGouv/onvs/commit/a57a51ff5ddde29619f997cf704b9760143d0f81))
* bug on counter. Prevent negative count ([807f7ee](https://github.com/SocialGouv/onvs/commit/807f7ee334ebc57380b467b88ea5bbf65bbc66a6))
* error in scope, the return prevented to route push to step3 ([3dd378e](https://github.com/SocialGouv/onvs/commit/3dd378eb1d6b5ff6040c4dbea790018c8933627c))
* eslint import order ([79b0922](https://github.com/SocialGouv/onvs/commit/79b09226206110eed6d4183470f32389df4d9129))
* problem with dependencies needed at runtime ([f6031c8](https://github.com/SocialGouv/onvs/commit/f6031c84f590e7c28083e8a60fb3e5046f949508))
* reasonNotApparent flag didn't work as expected. Refactor to fix ([09b1e18](https://github.com/SocialGouv/onvs/commit/09b1e189ed8218fdcfabbe82ae9553e4f2479bc5))
* remove semi colons from files ([9518c2f](https://github.com/SocialGouv/onvs/commit/9518c2ff7b8e5b39b566f8856f90fc5982b28f26))
* the criteria to not display Suivant buttons was false in step 4 ([5e4381e](https://github.com/SocialGouv/onvs/commit/5e4381e049c1adfb8300ef02ec20441e8a952a39))
* the validation message was not in french ([6aacce5](https://github.com/SocialGouv/onvs/commit/6aacce53c2261f2de548e679ba549b6bfdbf6bdf))
* validation problem if no person facts were clicked ([ef6b0d1](https://github.com/SocialGouv/onvs/commit/ef6b0d17532829873077d9e78c35416c5bf05dcb))
* **tailwind:** purge css was not well setup ([5fed5e4](https://github.com/SocialGouv/onvs/commit/5fed5e4aafd9cd4b8048504dfaac0f29c9e4b391))
* typo in dir name ([b2acb5f](https://github.com/SocialGouv/onvs/commit/b2acb5f8c4156c3b0a9ef1876873e81f04b96720))


### Features

* add second page of form ([#53](https://github.com/SocialGouv/onvs/issues/53)) ([b55b697](https://github.com/SocialGouv/onvs/commit/b55b697935abab01ab61f323dd8203714b73e50b))
* **config:** add config file for env variable API_URL ([47aa00d](https://github.com/SocialGouv/onvs/commit/47aa00db044f3fdaa2413ef19f61c31a093461b5))
* **config:** missing env var in next.config.js ([ee6590d](https://github.com/SocialGouv/onvs/commit/ee6590d759b16f7cc2cd173a2cc656ff7c99548d))
* **DB:** integration of Knex ([2b739b9](https://github.com/SocialGouv/onvs/commit/2b739b912d483f9aedc4726551ba616a2f4bfb14))
* **docker:** add missing files for knex ([c3bca19](https://github.com/SocialGouv/onvs/commit/c3bca19c7e6d54726d10efd5a4a3c00c8fd72360))
* **docker:** include .env in image ([8b316cb](https://github.com/SocialGouv/onvs/commit/8b316cb457e6f47e1486c274bb9b7da1be39ad71))
* **docker:** missing src/knex/migrations in container ([813e058](https://github.com/SocialGouv/onvs/commit/813e0588272ce30cbf145fbbf02e4ee2bc962478))
* add example of wizard form ([f8caa6a](https://github.com/SocialGouv/onvs/commit/f8caa6aa8008d060fb7d8c6432a7924be42544b0))
* add first form page ([c6c58d8](https://github.com/SocialGouv/onvs/commit/c6c58d8bed2808f2ba0906fbefb97980902139fe))
* add footer ([6477858](https://github.com/SocialGouv/onvs/commit/64778585da342ee5b9b76b233413fa7f80e79a6e))
* add hero title for landing page ([4b29fda](https://github.com/SocialGouv/onvs/commit/4b29fdad65e0def8294354b3e16f2019eb88c327))
* add multiple victims management ([85bb1fd](https://github.com/SocialGouv/onvs/commit/85bb1fd31b3ef799578fb34a2e8a3e8add153f25))
* add precision for some inputs ([0f8e917](https://github.com/SocialGouv/onvs/commit/0f8e917f16f440021606e017106fe84024888a87))
* add rough notation for a more crafty aspect of the landing page ([b7882f0](https://github.com/SocialGouv/onvs/commit/b7882f0bc6983b84ec6ad01070bc1d692aed41f7))
* add second page of form ([62f6dbd](https://github.com/SocialGouv/onvs/commit/62f6dbd52ceb898c35b4e7c0b8803358b286d467))
* add tailwind and first page ([e14ede8](https://github.com/SocialGouv/onvs/commit/e14ede8197fdbe1d1945420718c5ee5ec5fcd1cd))
* add transition transformation scale ([f1d127c](https://github.com/SocialGouv/onvs/commit/f1d127c609a5cf00350617a0bd80e432cdc969a6))
* add yup validation for step4 ([589f194](https://github.com/SocialGouv/onvs/commit/589f194611d18b3664ab483c7f8d4d5bfaea8fa7))
* dev of  form's fives steps and confirmation page. To be refined ([e87b0f6](https://github.com/SocialGouv/onvs/commit/e87b0f6160f294cea8cfcc024e6a076867cb1997))
* fill date with current date ([96a5a12](https://github.com/SocialGouv/onvs/commit/96a5a12fd0250f19f1c94bfa1d1d3bfd390cf2b5))
* improve responsiveness of the first page ([4419453](https://github.com/SocialGouv/onvs/commit/44194532901b3459acb892fa3e9feec6ec20210b))
* improve the persistence of declarations ([375ba6f](https://github.com/SocialGouv/onvs/commit/375ba6f9b43b6b54b6c82bc1d411b76e1df17ed9))
* improve UI ([6dfd1a9](https://github.com/SocialGouv/onvs/commit/6dfd1a91241c7ab6aeee4afc1fb30a7659824f4a))
* improve UI landing page ([dbb0b8c](https://github.com/SocialGouv/onvs/commit/dbb0b8c019ed7abcf3e1792e19953f7cd473a3b2))
* improve UI stepper and buttons ([de0b848](https://github.com/SocialGouv/onvs/commit/de0b848765962edd8d07b2f47d2e42ea912771be))
* manage multiple authors ([a3848ca](https://github.com/SocialGouv/onvs/commit/a3848cab7804ea173408c9490932dd76aea39277))
* new API for stats and find declaration ([37e0d4a](https://github.com/SocialGouv/onvs/commit/37e0d4aa308397778b9e40ed39905e2615ee687d))
* new debug page to see the form content in session storage ([44d0961](https://github.com/SocialGouv/onvs/commit/44d096183de3f897ced5d56ffd2b41fac9ffd5b9))
* new React component to display an error ([460b5bd](https://github.com/SocialGouv/onvs/commit/460b5bdb7b397ed3c7e8b121b0a93a9355c0e1fc))
* **a11y:** add aria attributes to improve the form's accessibility ([e18dd2f](https://github.com/SocialGouv/onvs/commit/e18dd2f1032c9f45ad662dffbeab91d8df72714c))
* **a11y:** add language for HTML markup to improve a11y ([ccb1a73](https://github.com/SocialGouv/onvs/commit/ccb1a733ae2776f74a319c5bab6fabdfcfa8f6ad))
* **config:** add absolute import support for Next and ESLint ([2f566f4](https://github.com/SocialGouv/onvs/commit/2f566f43ee882eadff335abb1884fcd8a112c828))
* **form:** add a first page in form for adding job ([1c86792](https://github.com/SocialGouv/onvs/commit/1c86792c32fdcbe5e04b540c8fc0aa95fd3ad339))
* **form:** add exclusive behavior for some checkbox + toast ([6bc21c0](https://github.com/SocialGouv/onvs/commit/6bc21c02abfaffa9312e79a97d7a1262fe560726))
* **form:** improve form validation with yup schema ([a27900e](https://github.com/SocialGouv/onvs/commit/a27900ead3b8003b744861509210888555b24924))
* **lib:** new RadioInput UI component ([072cd1d](https://github.com/SocialGouv/onvs/commit/072cd1d66bfe86d86caa62296ce2cc70560b4784))
* **test:** add test for Step1 page ([56efb75](https://github.com/SocialGouv/onvs/commit/56efb757cf32fceb594a74c842f5943842270867))
* **test:** new test for Step 0 ([9bb1320](https://github.com/SocialGouv/onvs/commit/9bb1320d8901a85de4c0a0587650f23909c10310))
* **tools:** ignore .next directory for tools ([a8ff014](https://github.com/SocialGouv/onvs/commit/a8ff014de99615aaeccf165157e0c3ed0d9dc73f))
* **validation:** Yup validation for step2 ([4b5ccb2](https://github.com/SocialGouv/onvs/commit/4b5ccb22c3e06591aac1746aa88506245a4392ed))
* manage data to show when user go back to a previous page ([43e8f8f](https://github.com/SocialGouv/onvs/commit/43e8f8f2f01866ec0e1367135d61271cac00fb02))
* reset form data on index page ([dbaf0d2](https://github.com/SocialGouv/onvs/commit/dbaf0d2c111c50f6068392306d076e451a6020d1))

# 1.0.1 (2020-04-29)

### Bug Fixes

### Features