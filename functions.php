<?php
/**
 *  Nachalo - child
 *
 *  This file is responsible for initializing the child theme's constants and launching the theme.
 *
 * @package DPUKtheme\Nachalo
 * @since  1.0.0
 * @author  Dan Pringle
 * @license GPL-2.0+
 * @link    https://danielpringle.co.uk/
 */



 add_action( 'nachalo_before_content',  'nachalo_breadcrumbs', 15);
//remove_action( 'nachalo_before_content', 'nachalo_breadcrumbs', 15);

wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/css/style.css', null, date("Y-m-d-h:i-s"), 'all');

// Goolge Fonts
wp_enqueue_style('google-font-style', '//fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,600,700, 700i|Montserrat:300,400,400i,600,700,700i|Lato:300,300i,400,400i,700,700i');



function child_breadcrumbs($args){

	$args['labels']['prefix'] = '';
	// $args['home'] = 'DPUK';
	$args['sep'] = '<span aria-label="breadcrumb separator" class="breadcrumb-seperator dashicons dashicons-arrow-right"></span>';
    $args['pages']['search'] = true;

	return $args;
}
add_filter( 'nachalo_breadcrumb_args', __NAMESPACE__ . '\child_breadcrumbs' );



/**
 * Add the breadcrumbs
 */ 
// function show_breadcrumbs(){

//  echo \nachalo\parent\get_nachalo_breadcrumbs();

// }

//
