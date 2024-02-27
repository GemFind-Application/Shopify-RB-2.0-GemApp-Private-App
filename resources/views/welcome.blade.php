@extends('shopify-app::layouts.default')
<?php echo header("Content-Security-Policy: frame-ancestors https://".Auth::user()->name." https://admin.shopify.com"); ?>

@section('content')
<link
  rel="stylesheet"
  href="https://unpkg.com/@shopify/polaris@8.0.0/build/esm/styles.css"
/>
    <!-- You are: (shop domain name) -->
    <!-- <p>You are: {{ $shopDomain ?? Auth::user()->name }}</p> -->
    @if(\Osiset\ShopifyApp\Util::getShopifyConfig('appbridge_enabled'))
        <script src="https://unpkg.com/@shopify/app-bridge{{ \Osiset\ShopifyApp\Util::getShopifyConfig('appbridge_version') ? '@'.config('shopify-app.appbridge_version') : '' }}"></script>
        <script src="https://unpkg.com/@shopify/app-bridge-utils{{ \Osiset\ShopifyApp\Util::getShopifyConfig('appbridge_version') ? '@'.config('shopify-app.appbridge_version') : '' }}"></script>
        <script
            @if(\Osiset\ShopifyApp\Util::getShopifyConfig('turbo_enabled'))
                data-turbolinks-eval="false"
            @endif
        >
            var AppBridge = window['app-bridge'];
            var actions = AppBridge.actions;
            var utils = window['app-bridge-utils'];
            var createApp = AppBridge.default;
            var app = createApp({
                apiKey: "{{ config('shopify-app.api_key') }}",
                shopOrigin: "{{ Auth::user()->name ?? Auth::user()->name }}",
                host: "{{Auth::user()->name}}",
                forceRedirect: true,
            });
        </script>

            @include('shopify-app::partials.token_handler')
            @include('shopify-app::partials.flash_messages')
    @endif
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <div id="root"></div>
    <input type="hidden" id="apiKey" value="{{ config('shopify-app.api_key') }}">
    <input type="hidden" id="shopOrigin" value="{{ $shopDomain ?? Auth::user()->name }}">

@endsection

@section('scripts')
    @parent
    <script src="{{asset('js/app.js')}}"></script>

    <script>
        actions.TitleBar.create(app, { title: 'Welcome' });
    </script>
@endsection
