import { ASSET_FILE, LAYER_SOURCE_DIR } from '@aws-cdk/asset-node-proxy-agent-v6';
import { Construct } from 'constructs';
import * as lambda from '../../aws-lambda';
import { FileSystem } from '../../core';

/**
 * An AWS Lambda layer that includes the NPM dependency `proxy-agent`.
 */
export class NodeProxyAgentLayer extends lambda.LayerVersion {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      code: lambda.Code.fromAsset(ASSET_FILE, {
        // we hash the layer directory (it contains the tools versions and Dockerfile) because hashing the zip is non-deterministic
        assetHash: FileSystem.fingerprint(LAYER_SOURCE_DIR),
      }),
      description: '/opt/nodejs/node_modules/proxy-agent',
    });
  }
}
