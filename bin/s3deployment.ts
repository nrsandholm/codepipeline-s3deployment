#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { S3DeploymentStack } from '../lib/s3deployment-stack';

const app = new cdk.App();

new S3DeploymentStack(app, 'S3DeploymentStack', {});