import { Stack, StackProps } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export class S3DeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const bucketA = new Bucket(this, 'BucketA', {});

    const bucketADeployment = new BucketDeployment(this, 'BucketADeployment', {
      sources: [
        Source.asset('my_content')
      ],
      destinationBucket: bucketA,
    });
  }
}
