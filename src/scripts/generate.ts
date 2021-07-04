import { spawnSync } from 'child_process';
import { join } from 'path';

const scripts: string[] = [
  // DONE
  // 'generate-languages.ts',
  // DONE
  // 'generate-projects.ts',
];

async function run(): Promise<void> {
  try {
    scripts.forEach(script => {
      const { status } = spawnSync(
        join('node_modules', '.bin', 'ts-node'),
        [
          '-P',
          'tsconfig.json',
          '-r',
          'tsconfig-paths/register',
          join('src', 'scripts', script),
        ],
        {
          stdio: 'inherit',
          killSignal: 1,
          env: {
            ...process.env,
            MAX_CLIENT_COUNT: '200',
            MAX_CONTRACT_COUNT: '200',
            MAX_CONTRACT_NBA_TIP_COUNT: '4',
            MAX_CONTRACT_RENEW_MODES_COUNT: '4',
            MAX_CONTRACT_RENEWAL_COUNT: '3',
            MAX_CONTRACT_SERVICE_COUNT: '3',
            MAX_HARDWARE_COUNT: '1',
            MAX_HARDWARE_ITEM_COUNT: '200',
            MAX_LEAD_COUNT: '200',
            MAX_MEMBER_CONTRACT_COUNT: '10',
            MAX_PARTNER_CONTRACT_PHONE_NUMBER_COUNT: '3',
            MAX_TARIFF_COUNT: '1',
            MAX_TARIFF_ITEM_COUNT: '300',
            POSTGRES_MAX_QUERY_EXECUTION_TIME: '5000',
            TYPEORM_LOGGING: 'false',
          },
        },
      );

      if (status !== 0) {
        throw new Error('Script exited with non-zero code');
      } else {
        console.log(`${script} executed`);
      }
    });

    console.log('Generate passed');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
