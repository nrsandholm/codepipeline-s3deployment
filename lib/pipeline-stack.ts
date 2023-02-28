import { SecretValue, Stack, StackProps, Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { S3DeploymentStack } from './s3deployment-stack';

class PipelineAppStage extends Stage {
  constructor(scope: Construct, id: string, props: StageProps) {
    super(scope, id, props);

    new S3DeploymentStack(this, 'S3DeploymentStack', {});
  }
}

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'CodePipeline', {
      pipelineName: 'S3Deployment',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('nrsandholm/codepipeline-s3deployment', 'main', {
          authentication: SecretValue.secretsManager(this.node.tryGetContext('repo-auth-token-name'))
        }),
        commands: [
          'npm install',
          'npm run cdk synth',
        ],
      })
    });

    pipeline
      .addStage(new PipelineAppStage(this, 'PipelineAppStage', {}))
      .addPre(new ShellStep('GenerateImages', {
        installCommands: [
          'mkdir my_content && cd my_content',
        ],
        commands: [
          'for i in {1..5}; do curl -s -o "my-$i.jpg" https://picsum.photos/200/300; done',
        ]
      }));
  }
}