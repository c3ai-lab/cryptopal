<?php

/**
 * Plugin Name: CryptoPal Payment for Woocommerce
 * Plugin URI: https://bluecryptopal.com
 * Author Name: Lars Raschke
 * Author URI: https://github.com/LarsRa
 * Description: This plugin enables payments with CryptoPal API in WooCommerce.
 * Version: 0.1.0
 * License: 0.1.0
 * License URL: http://www.gnu.org/licenses/gpl-2.0.txt
 * text-domain: crypto-pay-woo
*/ 

if ( ! in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) return;

add_action( 'plugins_loaded', 'cryptopal_payment_init', 11 );

function cryptopal_payment_init() {
    if( class_exists( 'WC_Payment_Gateway' ) ) {
        class WC_Crypto_Pay_Gateway extends WC_Payment_Gateway {
            public function __construct() {
                $this->id   = 'cryptopal_payment';
                $this->icon = apply_filters( 'woocommerce_crypto_icon', plugins_url('/assets/icon.png', __FILE__ ) );
                $this->has_fields = false;
                $this->method_title = __( 'CryptoPal Payment', 'crypto-pay-woo');
                $this->method_description = __( 'This plugin enables payments with CryptoPal API in WooCommerce.', 'crypto-pay-woo');

                $this->init_form_fields();
                $this->init_settings();

                $this->title = $this->get_option( 'title' );
                $this->description = $this->get_option( 'description' );
                $this->instructions = $this->get_option( 'instructions', $this->description );
                $this->merchant_email = $this->get_option( 'merchant_email' );
                $this->merchant_password = $this->get_option( 'merchant_password' );

                add_action( 'woocommerce_update_options_payment_gateways_' . $this->id, array( $this, 'process_admin_options' ) );
            }

            public function init_form_fields() {
                $this->form_fields = apply_filters( 'woo_crypto_pay_fields', array(
                    'enabled' => array(
                        'title' => __( 'Enable/Disable', 'crypto-pay-woo'),
                        'type' => 'checkbox',
                        'label' => __( 'Enable or Disable CryptoPal Payments', 'crypto-pay-woo'),
                        'default' => 'no'
                    ),
                    'title' => array(
                        'title' => __( 'CryptoPal', 'crypto-pay-woo'),
                        'type' => 'text',
                        'default' => __( 'CryptoPal', 'crypto-pay-woo'),
                        'desc_tip' => true,
                        'description' => __( 'Add a new title for the CryptoPal Payments Gateway that customers will see when they are in the checkout page.', 'crypto-pay-woo')
                    ),
                    'description' => array(
                        'title' => __( 'CryptoPal Payments Gateway Description', 'crypto-pay-woo'),
                        'type' => 'textarea',
                        'default' => __( 'Please remit your payment to the shop to allow for the delivery to be made', 'crypto-pay-woo'),
                        'desc_tip' => true,
                        'description' => __( 'Add a new title for the CryptoPal Payments Gateway that customers will see when they are in the checkout page.', 'crypto-pay-woo')
                    ),
                    'instructions' => array(
                        'title' => __( 'Instructions', 'crypto-pay-woo'),
                        'type' => 'textarea',
                        'default' => __( 'Default instructions', 'crypto-pay-woo'),
                        'desc_tip' => true,
                        'description' => __( 'Instructions that will be added to the thank you page and odrer email', 'crypto-pay-woo')
                    ),
                    'merchant_email' => array(
                        'title' => __( 'Merchants email', 'crypto-pay-woo'),
                        'type' => 'text',
                        'default' => __( 'l-raschi@web.de', 'crypto-pay-woo'),
                        'desc_tip' => __( 'The email of the cryptopal merchant account.', 'crypto-pay-woo')
                    ),
                    'merchant_password' => array(
                        'title' => __( 'Merchants password', 'crypto-pay-woo'),
                        'type' => 'password',
                        'default' => __( 'lololo', 'crypto-pay-woo'),
                        'desc_tip' => __( 'The password of the cryptopal merchant account.', 'crypto-pay-woo')
                    ),
                ));
            }

            function process_payment( $order_id ) {
                global $woocommerce;
                $order = new WC_Order( $order_id );
            
                // Mark as on-hold (we're awaiting the cheque)
                $order->update_status('on-hold', __( 'Awaiting cheque payment', 'woocommerce' ));

                // send login request to get auth token
                $login_url  = 'https://www.bluecryptopal.com/api/auth/login';

                $login_body = array(
                    'email' => $this->merchant_email,
                    'password' => $this->merchant_password,
                );

                $login_args = array(
                    'method'      => 'POST',
                    'timeout'     => 45,
                    'sslverify'   => false,
                    'headers'     => array(
                        'Content-Type'  => 'application/json',
                    ),
                    'body'        => json_encode($login_body),
                );

                $login_request = wp_remote_post( $login_url, $login_args );

                if ( is_wp_error( $login_request ) || wp_remote_retrieve_response_code( $login_request ) != 200 ) {
                    error_log( print_r( $login_request, true ) );
                }

                $login_response = json_decode( wp_remote_retrieve_body( $login_request ), true );

                // get items details
                $items = array();
                foreach ( $order->get_items() as $item_id => $item ) {
                    $quantity = $item->get_quantity();
                    $item_total = $item->get_total();
                    $item_details = array(
                        'name' => $item->get_name(),
                        'quantity' => strval($quantity),
                        'unit_amount' => array(
                            'currency_code' => 'USD',
                            'value' => strval($item_total/$quantity)
                        )
                    );
                    array_push($items, $item_details);
                 }

                // send create order request
                $order_url  = 'https://www.bluecryptopal.com/api/orders';

                $order_body = array(
                    'intent' => 'CAPTURE',
                    'purchase_units'     => array(
                        array(
                            'amount' => array(
                                'currency_code' => 'USD',
                                'value' => $order->order_total
                            ),
                            'reference_id'=> $order_id . '#' . $order->get_order_key(),
                            'items' => $items
                        )
                    )
                );

                
                $order_args = array(
                    'method'      => 'POST',
                    'timeout'     => 45,
                    'sslverify'   => false,
                    'headers'     => array(
                        'cp-auth-token' => $login_response['token'],
                        'Content-Type'  => 'application/json',
                    ),
                    'body'        => json_encode($order_body),
                );
                
                $order_request = wp_remote_post( $order_url, $order_args );
                
                if ( is_wp_error( $order_request ) || wp_remote_retrieve_response_code( $order_request ) != 200 ) {
                    
                    error_log( print_r( $order_request, true ) );
                }
                
                $order_response = json_decode( wp_remote_retrieve_body( $order_request ), true );           
            
                // // Remove cart
                $woocommerce->cart->empty_cart();
            
                // redirect
                return array(
                    'result' => 'success',
                    'redirect' => 'http://www.bluecryptopal.com/checkout?order='.$order_response['id']
                ); 
            }
        }
    }
}

add_filter( 'woocommerce_payment_gateways', 'add_to_woo_crypto_payment_gateway');

function add_to_woo_crypto_payment_gateway( $gateways ) {
    $gateways[] = 'WC_Crypto_Pay_Gateway';
    return $gateways;
}
