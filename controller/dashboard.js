exports.dashboard = function(req, res){
	connection.query("SELECT * FROM `organization_users` WHERE `id`='"+req.params.user_id+"' AND `sysadmin`='1'", function(err, admin){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(admin.length>0){
				var partialRfq="select count(`id`) as `total` from `rfq` where (`rfq_status_id`='0' OR `rfq_status_id`='1')";
				var newRfq="select count(`id`) as `total` from `rfq` where `rfq_status_id`='2'";
				 // where `created_by`='"+req.params.user_id+"'";
				var noBidRfq="select count(`id`) as `total` from `rfq` where `rfq_status_id`='3'";
				var bid_in_tenderingRfq="select count(`id`) as `total` from `rfq` where `rfq_status_id`='4'";
				var outTenderingRfq="select count(`id`) as `total` from `rfq` where `rfq_status_id`='5'";
				var completed="select count(`id`) as `total` from `rfq` where `rfq_status_id`='6'";
				var obsolete="select count(`id`) as `total` from `rfq` where `rfq_status_id`='8'";
				var expired = "select count(id) as total from rfq where NOW()>quote_validity_date AND `rfq_status_id`='6'";
				var totalPartialRfq=0;
				var totalNewRfq=0;
				var totalNoBidRfq=0;
				var totalbid_in_tenderingRfq=0;
				var totaloutTenderingRfq=0;
				var totalCompletedRfq=0;
				connection.query(partialRfq, function(err, info){
					if(err){
						console.log(err);
						res.json({"statusCode":500, "success": "false", "message": "internal error"});
					}
					else{
						totalPartialRfq=info[0].total;
						connection.query(newRfq, function(err, info){
							if(err){
								console.log(err);
								res.json({"statusCode":500, "success": "false", "message": "internal error"});
							}
							else{
								totalNewRfq=info[0].total;
								connection.query(noBidRfq, function(err, info){
									if(err){
										console.log(err);
										res.json({"statusCode":500, "success": "false", "message": "internal error"});
									}
									else{
										totalNoBidRfq=info[0].total;
										connection.query(bid_in_tenderingRfq, function(err, info){
											if(err){
												console.log(err);
												res.json({"statusCode":500, "success": "false", "message": "internal error"});
											}
											else{
												totalbid_in_tenderingRfq=info[0].total;
												connection.query(outTenderingRfq, function(err, info){
													if(err){
														console.log(err);
														res.json({"statusCode":500, "success": "false", "message": "internal error"});
													}
													else{
														totaloutTenderingRfq=info[0].total;
														connection.query(completed, function(err, info){
															if(err){
																console.log(err);
																res.json({"statusCode":500, "success": "false", "message": "internal error"});
															}
															else{
																totalCompletedRfq=info[0].total;
																// res.json({"statusCode":200, "success": "true", "message": "", "partial": totalPartialRfq, "new": totalNewRfq, "nobid": totalNoBidRfq, "bid_in_tendering": totalbid_in_tenderingRfq, "outTendering": totaloutTenderingRfq, "completed": totalCompletedRfq});
																connection.query(obsolete, function(err, info){
																	if(err){
																		console.log(err);
																		res.json({"statusCode":500, "success": "false", "message": "internal error"});
																	}
																	else{
																		totalobsoleteRfq=info[0].total;
																		connection.query(expired, function(err, info){
																			if(err){
																				console.log(err);
																				res.json({"statusCode":500, "success": "false", "message": "internal error"});
																			}
																			else{
																				totalExpiredRfq=info[0].total;
																				res.json({"statusCode":200, "success": "true", "message": "", "partial": totalPartialRfq, "new": totalNewRfq, "nobid": totalNoBidRfq, "bid_in_tendering": totalbid_in_tenderingRfq, "outTendering": totaloutTenderingRfq, "completed": totalCompletedRfq, "totalobsoleteRfq": totalobsoleteRfq, "totalExpiredRfq": totalExpiredRfq});
																			}
																		});
																	}
																});
															}
														});
													}
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
			else{
				connection.query("SELECT * FROM `sales_hubs` WHERE `head_id`='"+req.params.user_id+"' LIMIT 1", function(err, info){
					if(err){
						console.log(err);
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
					}
					else{
						if(info.length>0){
							var partialRfq="select count(`id`) as `total` from `rfq` where (`rfq_status_id`='0' OR `rfq_status_id`='1')  AND (`sales_hub_id`='"+info[0].id+"' OR `created_by`='"+req.params.user_id+"')";
							var newRfq="select count(`id`) as `total` from `rfq` where `rfq_status_id`='2'  AND (`sales_hub_id`='"+info[0].id+"' OR `created_by`='"+req.params.user_id+"')";
							var noBidRfq="select count(`id`) as `total` from `rfq` where `rfq_status_id`='3' AND (`sales_hub_id`='"+info[0].id+"' OR `created_by`='"+req.params.user_id+"')";
							var bid_in_tenderingRfq="select count(`id`) as `total` from `rfq` where `rfq_status_id`='4'  AND (`sales_hub_id`='"+info[0].id+"' OR `created_by`='"+req.params.user_id+"')";
							var outTenderingRfq="select count(`id`) as `total` from `rfq` where `rfq_status_id`='5' AND (`sales_hub_id`='"+info[0].id+"' OR `created_by`='"+req.params.user_id+"')";
							var completed="select count(`id`) as `total` from `rfq` where `rfq_status_id`='6' AND (`sales_hub_id`='"+info[0].id+"' OR `created_by`='"+req.params.user_id+"')";
							var obsolete="select count(`id`) as `total` from `rfq` where `rfq_status_id`='8' AND (`sales_hub_id`='"+info[0].id+"' OR `created_by`='"+req.params.user_id+"')";
							var expired = "select count(id) as total from rfq where NOW()>quote_validity_date AND `rfq_status_id`='6' AND (`sales_hub_id`='"+info[0].id+"' OR `created_by`='"+req.params.user_id+"')";
							var totalPartialRfq=0;
							var totalNewRfq=0;
							var totalNoBidRfq=0;
							var totalbid_in_tenderingRfq=0;
							var totaloutTenderingRfq=0;
							var totalCompletedRfq=0;
							connection.query(partialRfq, function(err, info){
								if(err){
									console.log(err);
									res.json({"statusCode":500, "success": "false", "message": "internal error"});
								}
								else{
									totalPartialRfq=info[0].total;
									connection.query(newRfq, function(err, info){
										if(err){
											console.log(err);
											res.json({"statusCode":500, "success": "false", "message": "internal error"});
										}
										else{
											totalNewRfq=info[0].total;
											connection.query(noBidRfq, function(err, info){
												if(err){
													console.log(err);
													res.json({"statusCode":500, "success": "false", "message": "internal error"});
												}
												else{
													totalNoBidRfq=info[0].total;
													connection.query(bid_in_tenderingRfq, function(err, info){
														if(err){
															console.log(err);
															res.json({"statusCode":500, "success": "false", "message": "internal error"});
														}
														else{
															totalbid_in_tenderingRfq=info[0].total;
															connection.query(outTenderingRfq, function(err, info){
																if(err){
																	console.log(err);
																	res.json({"statusCode":500, "success": "false", "message": "internal error"});
																}
																else{
																	totaloutTenderingRfq=info[0].total;
																	connection.query(completed, function(err, info){
																		if(err){
																			console.log(err);
																			res.json({"statusCode":500, "success": "false", "message": "internal error"});
																		}
																		else{
																			totalCompletedRfq=info[0].total;
																			// res.json({"statusCode":200, "success": "true", "message": "", "partial": totalPartialRfq, "new": totalNewRfq, "nobid": totalNoBidRfq, "bid_in_tendering": totalbid_in_tenderingRfq, "outTendering": totaloutTenderingRfq, "completed": totalCompletedRfq});
																			connection.query(obsolete, function(err, info){
																				if(err){
																					console.log(err);
																					res.json({"statusCode":500, "success": "false", "message": "internal error"});
																				}
																				else{
																					totalobsoleteRfq=info[0].total;
																					connection.query(expired, function(err, info){
																						if(err){
																							console.log(err);
																							res.json({"statusCode":500, "success": "false", "message": "internal error"});
																						}
																						else{
																							totalExpiredRfq=info[0].total;
																							res.json({"statusCode":200, "success": "true", "message": "", "partial": totalPartialRfq, "new": totalNewRfq, "nobid": totalNoBidRfq, "bid_in_tendering": totalbid_in_tenderingRfq, "outTendering": totaloutTenderingRfq, "completed": totalCompletedRfq, "totalobsoleteRfq": totalobsoleteRfq, "totalExpiredRfq": totalExpiredRfq});
																						}
																					});
																				}
																			});
																		}
																	});
																}
															});
														}
													});
												}
											});
										}
									});
								}
							});
						}
						else{
							// OR `rfq`.`sales_person_id`='"+req.params.user_id+"'
							var partialRfq="select count(`id`) as `total` from `rfq` where (`rfq_status_id`='0' OR `rfq_status_id`='1')  AND (`created_by`='"+req.params.user_id+"' OR `rfq`.`sales_person_id`='"+req.params.user_id+"' OR (`rfq`.`tendering_teams_id`=(SELECT `tendering_teams_id` FROM `organization_users` WHERE `id`='"+req.params.user_id+"' LIMIT 1) AND `rfq`.`tendering_teams_id`!='0'))";

							var newRfq="select count(`id`) as `total` from `rfq` where `rfq_status_id`='2'  AND (`created_by`='"+req.params.user_id+"' OR `rfq`.`sales_person_id`='"+req.params.user_id+"' OR (`rfq`.`tendering_teams_id`=(SELECT `tendering_teams_id` FROM `organization_users` WHERE `id`='"+req.params.user_id+"' LIMIT 1) AND `rfq`.`tendering_teams_id`!='0'))";
							 // where `created_by`='"+req.params.user_id+"'";
							var noBidRfq="select count(`id`) as `total` from `rfq` where `rfq_status_id`='3' AND (`created_by`='"+req.params.user_id+"' OR `rfq`.`sales_person_id`='"+req.params.user_id+"' OR (`rfq`.`tendering_teams_id`=(SELECT `tendering_teams_id` FROM `organization_users` WHERE `id`='"+req.params.user_id+"' LIMIT 1) AND `rfq`.`tendering_teams_id`!='0'))";
							var bid_in_tenderingRfq="select count(`id`) as `total` from `rfq` where `rfq_status_id`='4'  AND (`created_by`='"+req.params.user_id+"' OR `rfq`.`sales_person_id`='"+req.params.user_id+"' OR (`rfq`.`tendering_teams_id`=(SELECT `tendering_teams_id` FROM `organization_users` WHERE `id`='"+req.params.user_id+"' LIMIT 1) AND `rfq`.`tendering_teams_id`!='0'))";
							var outTenderingRfq="select count(`id`) as `total` from `rfq` where `rfq_status_id`='5' AND (`created_by`='"+req.params.user_id+"' OR `rfq`.`sales_person_id`='"+req.params.user_id+"' OR (`rfq`.`tendering_teams_id`=(SELECT `tendering_teams_id` FROM `organization_users` WHERE `id`='"+req.params.user_id+"' LIMIT 1) AND `rfq`.`tendering_teams_id`!='0'))";
							var completed="select count(`id`) as `total` from `rfq` where `rfq_status_id`='6' AND (`created_by`='"+req.params.user_id+"' OR `rfq`.`sales_person_id`='"+req.params.user_id+"' OR (`rfq`.`tendering_teams_id`=(SELECT `tendering_teams_id` FROM `organization_users` WHERE `id`='"+req.params.user_id+"' LIMIT 1) AND `rfq`.`tendering_teams_id`!='0'))";
							var obsolete="select count(`id`) as `total` from `rfq` where `rfq_status_id`='8' AND (`created_by`='"+req.params.user_id+"' OR `rfq`.`sales_person_id`='"+req.params.user_id+"' OR (`rfq`.`tendering_teams_id`=(SELECT `tendering_teams_id` FROM `organization_users` WHERE `id`='"+req.params.user_id+"' LIMIT 1) AND `rfq`.`tendering_teams_id`!='0'))";
							var expired = "select count(id) as total from rfq where NOW()>quote_validity_date AND `rfq_status_id`='6' AND (`created_by`='"+req.params.user_id+"' OR `rfq`.`sales_person_id`='"+req.params.user_id+"' OR (`rfq`.`tendering_teams_id`=(SELECT `tendering_teams_id` FROM `organization_users` WHERE `id`='"+req.params.user_id+"' LIMIT 1) AND `rfq`.`tendering_teams_id`!='0'))";
							var totalPartialRfq=0;
							var totalNewRfq=0;
							var totalNoBidRfq=0;
							var totalbid_in_tenderingRfq=0;
							var totaloutTenderingRfq=0;
							var totalCompletedRfq=0;
							connection.query(partialRfq, function(err, info){
								if(err){
									console.log(err);
									res.json({"statusCode":500, "success": "false", "message": "internal error"});
								}
								else{
									totalPartialRfq=info[0].total;
									connection.query(newRfq, function(err, info){
										if(err){
											console.log(err);
											res.json({"statusCode":500, "success": "false", "message": "internal error"});
										}
										else{
											totalNewRfq=info[0].total;
											connection.query(noBidRfq, function(err, info){
												if(err){
													console.log(err);
													res.json({"statusCode":500, "success": "false", "message": "internal error"});
												}
												else{
													totalNoBidRfq=info[0].total;
													connection.query(bid_in_tenderingRfq, function(err, info){
														if(err){
															console.log(err);
															res.json({"statusCode":500, "success": "false", "message": "internal error"});
														}
														else{
															totalbid_in_tenderingRfq=info[0].total;
															connection.query(outTenderingRfq, function(err, info){
																if(err){
																	console.log(err);
																	res.json({"statusCode":500, "success": "false", "message": "internal error"});
																}
																else{
																	totaloutTenderingRfq=info[0].total;
																	connection.query(completed, function(err, info){
																		if(err){
																			console.log(err);
																			res.json({"statusCode":500, "success": "false", "message": "internal error"});
																		}
																		else{
																			totalCompletedRfq=info[0].total;
																			// res.json({"statusCode":200, "success": "true", "message": "", "partial": totalPartialRfq, "new": totalNewRfq, "nobid": totalNoBidRfq, "bid_in_tendering": totalbid_in_tenderingRfq, "outTendering": totaloutTenderingRfq, "completed": totalCompletedRfq});
																			connection.query(obsolete, function(err, info){
																				if(err){
																					console.log(err);
																					res.json({"statusCode":500, "success": "false", "message": "internal error"});
																				}
																				else{
																					totalobsoleteRfq=info[0].total;
																					connection.query(expired, function(err, info){
																						if(err){
																							console.log(err);
																							res.json({"statusCode":500, "success": "false", "message": "internal error"});
																						}
																						else{
																							totalExpiredRfq=info[0].total;
																							res.json({"statusCode":200, "success": "true", "message": "", "partial": totalPartialRfq, "new": totalNewRfq, "nobid": totalNoBidRfq, "bid_in_tendering": totalbid_in_tenderingRfq, "outTendering": totaloutTenderingRfq, "completed": totalCompletedRfq, "totalobsoleteRfq": totalobsoleteRfq, "totalExpiredRfq": totalExpiredRfq});
																						}
																					});
																				}
																			});
																		}
																	});
																}
															});
														}
													});
												}
											});
										}
									});
								}
							});
						}
					}
				});
				
			}
		}
	});
};