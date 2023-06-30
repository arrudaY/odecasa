provider "aws" {
  region = "sa-east-1"   # Substitua pela região desejada da AWS
}

data "aws_instances" "existing_instances" {
  instance_tags = {
    Name = "ExampleInstance"
  }
}

resource "aws_codedeploy_app" "deploy1" {
  name             = "g2-odecasa-dev"
  compute_platform = "Server"
}

resource "aws_codedeploy_deployment_group" "deploygroup1" {
  app_name               = aws_codedeploy_app.deploy1.name
  deployment_group_name  = "back-prod"
  deployment_config_name = "CodeDeployDefault.AllAtOnce"
  service_role_arn       = "arn:aws:iam::405378853534:role/GP2-User"

  ec2_tag_set {
    tag_filter_type = "KEY_AND_VALUE"

    tags = {
      "tag_key_1" = "DEPLOY"
      "tag_key_2" = "GP2"
      "tag_key_3" = "DEV"
      "tag_key_4" = "BACK"
      // Add more tags as needed
    }
  }
}
