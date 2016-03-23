<!DOCTYPE html>
<html lang="en" ng-app="app">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>SB Admin - Bootstrap Admin Template</title>

    <link href="{{ asset('build/css/app.css') }}" rel="stylesheet"/>

    <!-- Bootstrap Core CSS -->
    <link href="{{  asset('build/css/vendor/bootstrap.min.css') }}" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="{{  asset('build/css/vendor/sb-admin.css')}}" rel="stylesheet">

    <link href="{{  asset('build/css/vendor/popoto.min.css')}}" rel="stylesheet">

    <!-- Morris Charts CSS -->
    <link href="{{ asset('build/css/vendor/morris.css') }}" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="{{asset('build/css/font-awesome.css')}}" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

<div id="wrapper">

    <!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="index.html">Mapa Mundi - TI</a>
        </div>
        <!-- Top Menu Items -->
        <ul class="nav navbar-right top-nav">
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-envelope"></i> <b class="caret"></b></a>
                <ul class="dropdown-menu message-dropdown">
                    <li class="message-preview">
                        <a href="#">
                            <div class="media">
                                    <span class="pull-left">
                                        <img class="media-object" src="http://placehold.it/50x50" alt="">
                                    </span>
                                <div class="media-body">
                                    <h5 class="media-heading"><strong>John Smith</strong>
                                    </h5>
                                    <p class="small text-muted"><i class="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li class="message-preview">
                        <a href="#">
                            <div class="media">
                                    <span class="pull-left">
                                        <img class="media-object" src="http://placehold.it/50x50" alt="">
                                    </span>
                                <div class="media-body">
                                    <h5 class="media-heading"><strong>John Smith</strong>
                                    </h5>
                                    <p class="small text-muted"><i class="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li class="message-preview">
                        <a href="#">
                            <div class="media">
                                    <span class="pull-left">
                                        <img class="media-object" src="http://placehold.it/50x50" alt="">
                                    </span>
                                <div class="media-body">
                                    <h5 class="media-heading"><strong>John Smith</strong>
                                    </h5>
                                    <p class="small text-muted"><i class="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li class="message-footer">
                        <a href="#">Read All New Messages</a>
                    </li>
                </ul>
            </li>
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-bell"></i> <b class="caret"></b></a>
                <ul class="dropdown-menu alert-dropdown">
                    <li>
                        <a href="#">Alert Name <span class="label label-default">Alert Badge</span></a>
                    </li>
                    <li>
                        <a href="#">Alert Name <span class="label label-primary">Alert Badge</span></a>
                    </li>
                    <li>
                        <a href="#">Alert Name <span class="label label-success">Alert Badge</span></a>
                    </li>
                    <li>
                        <a href="#">Alert Name <span class="label label-info">Alert Badge</span></a>
                    </li>
                    <li>
                        <a href="#">Alert Name <span class="label label-warning">Alert Badge</span></a>
                    </li>
                    <li>
                        <a href="#">Alert Name <span class="label label-danger">Alert Badge</span></a>
                    </li>
                    <li class="divider"></li>
                    <li>
                        <a href="#">View All</a>
                    </li>
                </ul>
            </li>
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"></i> John Smith <b class="caret"></b></a>
                <ul class="dropdown-menu">
                    <li>
                        <a href="#"><i class="fa fa-fw fa-user"></i> Profile</a>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-fw fa-envelope"></i> Inbox</a>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-fw fa-gear"></i> Settings</a>
                    </li>
                    <li class="divider"></li>
                    <li>
                        <a href="#"><i class="fa fa-fw fa-power-off"></i> Log Out</a>
                    </li>
                </ul>
            </li>
        </ul>
        <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->
        <div class="collapse navbar-collapse navbar-ex1-collapse">
            <ul class="nav navbar-nav side-nav">
                <li class="active">
                    <a href="index.html"><i class="fa fa-fw fa-dashboard"></i> Dashboard</a>
                </li>
                <li>
                    <a href="charts.html"><i class="fa fa-fw fa-bar-chart-o"></i> Charts</a>
                </li>
                <li>
                    <a href="tables.html"><i class="fa fa-fw fa-table"></i> Tables</a>
                </li>
                <li>
                    <a href="forms.html"><i class="fa fa-fw fa-edit"></i> Forms</a>
                </li>
                <li>
                    <a href="bootstrap-elements.html"><i class="fa fa-fw fa-desktop"></i> Bootstrap Elements</a>
                </li>
                <li>
                    <a href="bootstrap-grid.html"><i class="fa fa-fw fa-wrench"></i> Bootstrap Grid</a>
                </li>
                <li>
                    <a href="javascript:;" data-toggle="collapse" data-target="#demo"><i class="fa fa-fw fa-arrows-v"></i> Dropdown <i class="fa fa-fw fa-caret-down"></i></a>
                    <ul id="demo" class="collapse">
                        <li>
                            <a href="#">Dropdown Item</a>
                        </li>
                        <li>
                            <a href="#">Dropdown Item</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="blank-page.html"><i class="fa fa-fw fa-file"></i> Blank Page</a>
                </li>
                <li>
                    <a href="index-rtl.html"><i class="fa fa-fw fa-dashboard"></i> RTL Dashboard</a>
                </li>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </nav>

    {{--<div id="page-wrapper">--}}

        {{--<div class="container-fluid">--}}

            {{--<!-- Page Heading -->--}}
            {{--<div class="row">--}}
                {{--<div class="col-lg-12">--}}
                    {{--<h1 class="page-header">--}}
                        {{--Dashboard <small>Statistics Overview</small>--}}
                    {{--</h1>--}}
                    {{--<ol class="breadcrumb">--}}
                        {{--<li class="active">--}}
                            {{--<i class="fa fa-dashboard"></i> Dashboard--}}
                        {{--</li>--}}
                    {{--</ol>--}}
                {{--</div>--}}
            {{--</div>--}}
            {{--<!-- /.row -->--}}

            {{--<div class="row">--}}
                {{--<div class="col-lg-12">--}}
                    {{--<div class="alert alert-info alert-dismissable">--}}
                        {{--<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>--}}
                        {{--<i class="fa fa-info-circle"></i>  <strong>Like SB Admin?</strong> Try out <a href="http://startbootstrap.com/template-overviews/sb-admin-2" class="alert-link">SB Admin 2</a> for additional features!--}}
                    {{--</div>--}}
                {{--</div>--}}
            {{--</div>--}}
            {{--<!-- /.row -->--}}

            {{--<div class="row">--}}
                {{--<div class="col-lg-3 col-md-6">--}}
                    {{--<div class="panel panel-primary">--}}
                        {{--<div class="panel-heading">--}}
                            {{--<div class="row">--}}
                                {{--<div class="col-xs-3">--}}
                                    {{--<i class="fa fa-comments fa-5x"></i>--}}
                                {{--</div>--}}
                                {{--<div class="col-xs-9 text-right">--}}
                                    {{--<div class="huge">26</div>--}}
                                    {{--<div>New Comments!</div>--}}
                                {{--</div>--}}
                            {{--</div>--}}
                        {{--</div>--}}
                        {{--<a href="#">--}}
                            {{--<div class="panel-footer">--}}
                                {{--<span class="pull-left">View Details</span>--}}
                                {{--<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>--}}
                                {{--<div class="clearfix"></div>--}}
                            {{--</div>--}}
                        {{--</a>--}}
                    {{--</div>--}}
                {{--</div>--}}
                {{--<div class="col-lg-3 col-md-6">--}}
                    {{--<div class="panel panel-green">--}}
                        {{--<div class="panel-heading">--}}
                            {{--<div class="row">--}}
                                {{--<div class="col-xs-3">--}}
                                    {{--<i class="fa fa-tasks fa-5x"></i>--}}
                                {{--</div>--}}
                                {{--<div class="col-xs-9 text-right">--}}
                                    {{--<div class="huge">12</div>--}}
                                    {{--<div>New Tasks!</div>--}}
                                {{--</div>--}}
                            {{--</div>--}}
                        {{--</div>--}}
                        {{--<a href="#">--}}
                            {{--<div class="panel-footer">--}}
                                {{--<span class="pull-left">View Details</span>--}}
                                {{--<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>--}}
                                {{--<div class="clearfix"></div>--}}
                            {{--</div>--}}
                        {{--</a>--}}
                    {{--</div>--}}
                {{--</div>--}}
                {{--<div class="col-lg-3 col-md-6">--}}
                    {{--<div class="panel panel-yellow">--}}
                        {{--<div class="panel-heading">--}}
                            {{--<div class="row">--}}
                                {{--<div class="col-xs-3">--}}
                                    {{--<i class="fa fa-shopping-cart fa-5x"></i>--}}
                                {{--</div>--}}
                                {{--<div class="col-xs-9 text-right">--}}
                                    {{--<div class="huge">124</div>--}}
                                    {{--<div>New Orders!</div>--}}
                                {{--</div>--}}
                            {{--</div>--}}
                        {{--</div>--}}
                        {{--<a href="#">--}}
                            {{--<div class="panel-footer">--}}
                                {{--<span class="pull-left">View Details</span>--}}
                                {{--<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>--}}
                                {{--<div class="clearfix"></div>--}}
                            {{--</div>--}}
                        {{--</a>--}}
                    {{--</div>--}}
                {{--</div>--}}
                {{--<div class="col-lg-3 col-md-6">--}}
                    {{--<div class="panel panel-red">--}}
                        {{--<div class="panel-heading">--}}
                            {{--<div class="row">--}}
                                {{--<div class="col-xs-3">--}}
                                    {{--<i class="fa fa-support fa-5x"></i>--}}
                                {{--</div>--}}
                                {{--<div class="col-xs-9 text-right">--}}
                                    {{--<div class="huge">13</div>--}}
                                    {{--<div>Support Tickets!</div>--}}
                                {{--</div>--}}
                            {{--</div>--}}
                        {{--</div>--}}
                        {{--<a href="#">--}}
                            {{--<div class="panel-footer">--}}
                                {{--<span class="pull-left">View Details</span>--}}
                                {{--<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>--}}
                                {{--<div class="clearfix"></div>--}}
                            {{--</div>--}}
                        {{--</a>--}}
                    {{--</div>--}}
                {{--</div>--}}
            {{--</div>--}}
            {{--<!-- /.row -->--}}

            {{--<div class="row">--}}
                {{--<div class="col-lg-12">--}}
                    {{--<div class="panel panel-default">--}}
                        {{--<div class="panel-heading">--}}
                            {{--<h3 class="panel-title"><i class="fa fa-bar-chart-o fa-fw"></i> Area Chart</h3>--}}
                        {{--</div>--}}
                        {{--<div class="panel-body">--}}
                            {{--<div id="morris-area-chart"></div>--}}
                        {{--</div>--}}
                    {{--</div>--}}
                {{--</div>--}}
            {{--</div>--}}
            {{--<!-- /.row -->--}}

            {{--<div class="row">--}}
                {{--<div class="col-lg-4">--}}
                    {{--<div class="panel panel-default">--}}
                        {{--<div class="panel-heading">--}}
                            {{--<h3 class="panel-title"><i class="fa fa-long-arrow-right fa-fw"></i> Donut Chart</h3>--}}
                        {{--</div>--}}
                        {{--<div class="panel-body">--}}
                            {{--<div id="morris-donut-chart"></div>--}}
                            {{--<div class="text-right">--}}
                                {{--<a href="#">View Details <i class="fa fa-arrow-circle-right"></i></a>--}}
                            {{--</div>--}}
                        {{--</div>--}}
                    {{--</div>--}}
                {{--</div>--}}
                {{--<div class="col-lg-4">--}}
                    {{--<div class="panel panel-default">--}}
                        {{--<div class="panel-heading">--}}
                            {{--<h3 class="panel-title"><i class="fa fa-clock-o fa-fw"></i> Tasks Panel</h3>--}}
                        {{--</div>--}}
                        {{--<div class="panel-body">--}}
                            {{--<div class="list-group">--}}
                                {{--<a href="#" class="list-group-item">--}}
                                    {{--<span class="badge">just now</span>--}}
                                    {{--<i class="fa fa-fw fa-calendar"></i> Calendar updated--}}
                                {{--</a>--}}
                                {{--<a href="#" class="list-group-item">--}}
                                    {{--<span class="badge">4 minutes ago</span>--}}
                                    {{--<i class="fa fa-fw fa-comment"></i> Commented on a post--}}
                                {{--</a>--}}
                                {{--<a href="#" class="list-group-item">--}}
                                    {{--<span class="badge">23 minutes ago</span>--}}
                                    {{--<i class="fa fa-fw fa-truck"></i> Order 392 shipped--}}
                                {{--</a>--}}
                                {{--<a href="#" class="list-group-item">--}}
                                    {{--<span class="badge">46 minutes ago</span>--}}
                                    {{--<i class="fa fa-fw fa-money"></i> Invoice 653 has been paid--}}
                                {{--</a>--}}
                                {{--<a href="#" class="list-group-item">--}}
                                    {{--<span class="badge">1 hour ago</span>--}}
                                    {{--<i class="fa fa-fw fa-user"></i> A new user has been added--}}
                                {{--</a>--}}
                                {{--<a href="#" class="list-group-item">--}}
                                    {{--<span class="badge">2 hours ago</span>--}}
                                    {{--<i class="fa fa-fw fa-check"></i> Completed task: "pick up dry cleaning"--}}
                                {{--</a>--}}
                                {{--<a href="#" class="list-group-item">--}}
                                    {{--<span class="badge">yesterday</span>--}}
                                    {{--<i class="fa fa-fw fa-globe"></i> Saved the world--}}
                                {{--</a>--}}
                                {{--<a href="#" class="list-group-item">--}}
                                    {{--<span class="badge">two days ago</span>--}}
                                    {{--<i class="fa fa-fw fa-check"></i> Completed task: "fix error on sales page"--}}
                                {{--</a>--}}
                            {{--</div>--}}
                            {{--<div class="text-right">--}}
                                {{--<a href="#">View All Activity <i class="fa fa-arrow-circle-right"></i></a>--}}
                            {{--</div>--}}
                        {{--</div>--}}
                    {{--</div>--}}
                {{--</div>--}}
                {{--<div class="col-lg-4">--}}
                    {{--<div class="panel panel-default">--}}
                        {{--<div class="panel-heading">--}}
                            {{--<h3 class="panel-title"><i class="fa fa-money fa-fw"></i> Transactions Panel</h3>--}}
                        {{--</div>--}}
                        {{--<div class="panel-body">--}}
                            {{--<div class="table-responsive">--}}
                                {{--<table class="table table-bordered table-hover table-striped">--}}
                                    {{--<thead>--}}
                                    {{--<tr>--}}
                                        {{--<th>Order #</th>--}}
                                        {{--<th>Order Date</th>--}}
                                        {{--<th>Order Time</th>--}}
                                        {{--<th>Amount (USD)</th>--}}
                                    {{--</tr>--}}
                                    {{--</thead>--}}
                                    {{--<tbody>--}}
                                    {{--<tr>--}}
                                        {{--<td>3326</td>--}}
                                        {{--<td>10/21/2013</td>--}}
                                        {{--<td>3:29 PM</td>--}}
                                        {{--<td>$321.33</td>--}}
                                    {{--</tr>--}}
                                    {{--<tr>--}}
                                        {{--<td>3325</td>--}}
                                        {{--<td>10/21/2013</td>--}}
                                        {{--<td>3:20 PM</td>--}}
                                        {{--<td>$234.34</td>--}}
                                    {{--</tr>--}}
                                    {{--<tr>--}}
                                        {{--<td>3324</td>--}}
                                        {{--<td>10/21/2013</td>--}}
                                        {{--<td>3:03 PM</td>--}}
                                        {{--<td>$724.17</td>--}}
                                    {{--</tr>--}}
                                    {{--<tr>--}}
                                        {{--<td>3323</td>--}}
                                        {{--<td>10/21/2013</td>--}}
                                        {{--<td>3:00 PM</td>--}}
                                        {{--<td>$23.71</td>--}}
                                    {{--</tr>--}}
                                    {{--<tr>--}}
                                        {{--<td>3322</td>--}}
                                        {{--<td>10/21/2013</td>--}}
                                        {{--<td>2:49 PM</td>--}}
                                        {{--<td>$8345.23</td>--}}
                                    {{--</tr>--}}
                                    {{--<tr>--}}
                                        {{--<td>3321</td>--}}
                                        {{--<td>10/21/2013</td>--}}
                                        {{--<td>2:23 PM</td>--}}
                                        {{--<td>$245.12</td>--}}
                                    {{--</tr>--}}
                                    {{--<tr>--}}
                                        {{--<td>3320</td>--}}
                                        {{--<td>10/21/2013</td>--}}
                                        {{--<td>2:15 PM</td>--}}
                                        {{--<td>$5663.54</td>--}}
                                    {{--</tr>--}}
                                    {{--<tr>--}}
                                        {{--<td>3319</td>--}}
                                        {{--<td>10/21/2013</td>--}}
                                        {{--<td>2:13 PM</td>--}}
                                        {{--<td>$943.45</td>--}}
                                    {{--</tr>--}}
                                    {{--</tbody>--}}
                                {{--</table>--}}
                            {{--</div>--}}
                            {{--<div class="text-right">--}}
                                {{--<a href="#">View All Transactions <i class="fa fa-arrow-circle-right"></i></a>--}}
                            {{--</div>--}}
                        {{--</div>--}}
                    {{--</div>--}}
                {{--</div>--}}
            {{--</div>--}}
            {{--<!-- /.row -->--}}

        {{--</div>--}}
        {{--<!-- /.container-fluid -->--}}

    {{--</div>--}}
    {{--<!-- /#page-wrapper -->--}}
    <div id="page-wrapper" class="container-fluid">
        <div ng-view>

        </div>
    </div>


</div>
<!-- /#wrapper -->



<!-- jQuery -->
<script src="{{asset('build/js/vendor/jquery.min.js')}}"></script>

<script src="{{asset('build/js/vendor/angular.min.js')}}"></script>
<script src="{{asset('build/js/vendor/angular-route.min.js')}}"></script>
<script src="{{asset('build/js/vendor/angular-resource.min.js')}}"></script>
<script src="{{asset('build/js/vendor/angular-animate.min.js')}}"></script>
<script src="{{asset('build/js/vendor/angular-messages.min.js')}}"></script>
<script src="{{asset('build/js/vendor/angular-cookies.min.js')}}"></script>
<script src="{{asset('build/js/vendor/query-string.js')}}"></script>
<script src="{{asset('build/js/vendor/angular-oauth2.min.js')}}"></script>
<script src="{{asset('build/js/vendor/ui-bootstrap-tpls.min.js')}}"></script>


    <!-- Bootstrap Core JavaScript -->
    <script src="{{asset('build/js/vendor/bootstrap.min.js')}}"></script>

    <!-- Morris Charts JavaScript -->
    <script src="{{asset('build/js/vendor/raphael-min.js')}}"></script>
    <script src="{{asset('build/js/vendor/morris.min.js')}}"></script>
    <script src="{{asset('build/js/vendor/morris-data.js')}}"></script>

    <script src="{{asset('build/js/app.js')}}"></script>

<!-- CONTROLLERS !-->
<script src="{{asset('build/js/controllers/login.js')}}"></script>
<script src="{{asset('build/js/controllers/home.js')}}"></script>

<script src="{{asset('build/js/controllers/client/clientList.js')}}"></script>
<script src="{{asset('build/js/controllers/client/clientNew.js')}}"></script>
<script src="{{asset('build/js/controllers/client/clientEdit.js')}}"></script>
<script src="{{asset('build/js/controllers/client/clientRemove.js')}}"></script>

<script src="{{asset('build/js/controllers/project/projectList.js')}}"></script>
<script src="{{asset('build/js/controllers/project/projectNew.js')}}"></script>
<script src="{{asset('build/js/controllers/project/projectEdit.js')}}"></script>
<script src="{{asset('build/js/controllers/project/projectRemove.js')}}"></script>

<script src="{{asset('build/js/controllers/project-note/projectNoteList.js')}}"></script>
<script src="{{asset('build/js/controllers/project-note/projectNoteNew.js')}}"></script>
<script src="{{asset('build/js/controllers/project-note/projectNoteEdit.js')}}"></script>
<script src="{{asset('build/js/controllers/project-note/projectNoteRemove.js')}}"></script>

<script src="{{asset('build/js/controllers/neo4j/neo4jList.js')}}"></script>

<!-- FILTERS !-->
<script src="{{asset('build/js/filters/date-br.js')}}"></script>

<!-- DIRECTIVES !-->
<script src="{{asset('build/js/directives/format.js')}}"></script>

<!-- SERVICES !-->
<script src="{{asset('build/js/services/client.js')}}"></script>
<script src="{{asset('build/js/services/project.js')}}"></script>
<script src="{{asset('build/js/services/projectNote.js')}}"></script>
<script src="{{asset('build/js/services/user.js')}}"></script>
<script src="{{asset('build/js/services/neo4j.js')}}"></script>

<!-- POPOTO -->
<script src="{{asset('build/js/vendor/analytics.js')}}"></script>
<script src="{{asset('build/js/vendor/d3.v3.min.js')}}"></script>
<!--<script src="{{asset('build/js/vendor/popoto.min.js')}}"></script>-->
<script src="{{asset('build/js/vendor/popoto.js')}}"></script>

?rev=<?php echo time();?>

</body>

</html>
